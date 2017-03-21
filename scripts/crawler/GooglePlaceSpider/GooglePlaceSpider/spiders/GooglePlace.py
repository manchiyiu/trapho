# -*- coding: utf-8 -*-
import scrapy
import json

# URL Prefices of Google Places API
_url_prefix = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=prominence&language=en"
_supp_url_prefix = "https://maps.googleapis.com/maps/api/place/textsearch/json?language=en"

# Location category to be searched
_category = ["airport", "amusement_park", "aquarium", "art_gallery", "bar", "casino", "city_hall", "department_store", "food", "museum", "night_club", "park", "place_of_worship", "spa", "stadium", "university", "zoo"]

# Supplementary category to be searched by text search
_supp_category = ["point_of_interest", "natural_feature"]

_google_api_key = "AIzaSyD_nUa5TDEVMWvZK60VsZ8g5YqHHig7twY"

class GoogleplaceSpider(scrapy.Spider):
	name = "GooglePlace"
	allowed_domains = ["maps.googleapis.com"]

	# *** Keywords for each request should be seperated by comma ','
	# *** Keywords in a request should be seperated by a space
	# e.g. "victoria harbour, the peak" generates 2 extra request:
	#		1. victoria harbour
	#		2. the peak
	def __init__(self, lat=22.334317, lng = 114.166214, radius = 24000, location = "Hong Kong", keywords = "", *args, **kwargs):
		super(GoogleplaceSpider, self).__init__(*args, **kwargs)
		self.center_lat = lat
		self.center_lng = lng
		self.center_radius = radius
		self.location = location
		self.keywords = keywords.split(",")
		self.keywords = [x.strip() for x in self.keywords]

	def start_requests(self):
		# Search by category
		url_combined_prefix = _url_prefix+"&key="+_google_api_key+"&location="+str(self.center_lat)+","+str(self.center_lng)+"&radius="+str(self.center_radius)+"&types="
		urls = [url_combined_prefix+x for x in _category]

		# Search by supplementary category
		supp_url_combined_prefix = _supp_url_prefix+"&key="+_google_api_key+"&location="+str(self.center_lat)+","+str(self.center_lng)+"&radius="+str(self.center_radius)+"&query="
		supp_urls = [supp_url_combined_prefix+x.replace("_", "+")+"+"+self.location.replace(" ", "+") for x in _supp_category]
		urls.extend(supp_urls)

		# Search by supplemtary keywords
		suppkey_url_combined_prefix = _supp_url_prefix+"&key="+_google_api_key+"&location="+str(self.center_lat)+","+str(self.center_lng)+"&radius="+str(self.center_radius)+"&query="
		supp_urls = [suppkey_url_combined_prefix+x.replace(" ", "+") for x in self.keywords]
		urls.extend(supp_urls)

		# Spawn requests
		print "Spawning requests..."
		for url in urls:
			yield scrapy.Request(url = url, callback = self.parse)

	def parse(self, response):
		json_response = json.loads(response.body_as_unicode())
		print "Parsing "+response.url
		# Save the token if result spreads across multiple pages
		next_page_token = ""
		if "next_page_token" in json_response:
			next_page_token = json_response["next_page_token"]

		# Convert locations to objects
		locations_google = json_response["results"]
		for location_google in locations_google:
			tmp_id = location_google["place_id"]
			tmp_coor = location_google["geometry"]["location"]
			tmp_name = location_google["name"]
			tmp_photo = []
			if "photos" in location_google:
				tmp_photo = location_google["photos"]
			tmp_tags = location_google["types"]
			tmp_tags = [x.replace("_", " ") for x in tmp_tags]
			tmp_desc = ""
			if "vicinity" in location_google:
				tmp_desc = location_google["vicinity"]
			yield Position_Storage(tmp_id, tmp_name, tmp_coor, tmp_photo, tmp_tags, tmp_desc).to_dict()

		if(len(next_page_token) > 0):
			next_url = _url_prefix+"&key="+_google_api_key+"&pagetoken="+next_page_token
			# Spawn new request if result spreads over next page
			yield scrapy.Request(url=next_url, callback=self.parse)


class Position_Storage:
	def __init__(self, place_id, name, coordinates, photos, tags, description):
		self.id = place_id
		self.name = name
		self.coordinates = coordinates
		self.photos = photos
		self.tags = tags
		self.description = description

	def to_dict(self):
		json_dict = {
			"google_place_id":self.id,
			"name":self.name,
			"coordinates":self.coordinates,
			"photos":self.photos,
			"tags":self.tags,
			"description":self.description
		}
		return json_dict