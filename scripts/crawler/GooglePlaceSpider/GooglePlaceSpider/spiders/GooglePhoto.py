# -*- coding: utf-8 -*-
import scrapy
import json
import random

# URL Prefices of Google Places API
_url_prefix = "https://maps.googleapis.com/maps/api/place/photo?key="

_google_api_key = "AIzaSyD_nUa5TDEVMWvZK60VsZ8g5YqHHig7twY"

class GooglePhotoSpider(scrapy.Spider):
	name = "GooglePhoto"

	def __init__(self, number = 1000, json_path = "", *args, **kwargs):
		super(GooglePhotoSpider, self).__init__(*args, **kwargs)
		if len(json_path) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_json_path')
		with open(json_path, "r") as file:
			self.locations = json.load(file)
		self.locations = [x for x in self.locations if len(x["photos"]) > 0]
		number = int(number)
		if len(self.locations) > number:
			self.locations = random.sample(self.locations, number)
		print "Going to crawl "+str(len(self.locations))+" photos from Google."

	def start_requests(self):
		for location in self.locations:
			photo_reference = location["photos"][0]["photo_reference"]
			max_width = location["photos"][0]["width"]
			location_coor = location["coordinates"]
			url = _url_prefix+_google_api_key+"&photoreference="+photo_reference+"&maxwidth="+str(max_width)
			request = scrapy.Request(url = url, callback = self.save_photo)
			request.meta["lat"] = location_coor["lat"]
			request.meta["lng"] = location_coor["lng"]
			yield request

	def save_photo(self, response):
		with open("photos/"+str(response.meta["lat"])+"-"+str(response.meta["lng"])+".jpg", "w") as file:
			file.write(response.body)
