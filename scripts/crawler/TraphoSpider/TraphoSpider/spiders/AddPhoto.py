import scrapy
import json
import logging
import random
import os
import requests

logging.getLogger('scrapy').setLevel(logging.WARNING)

_descriptions = [
	"A good place!",
	"An amazing attraction",
	"Gorgeous!",
	"Worth going",
	"I go to there by bus",
	"Interesting",
	"Funny Warren",
	"Funny Isaac",
	"Funny Ray",
	"Funny King"
]

class AddPhotoSpider(scrapy.Spider):
	name = "AddPhoto"
	handle_httpstatus_list = [500, 403]
	def __init__(self, token = "", domain="localhost:3000", photo_path="", userIds_path="", *args, **kwargs):
		if len(token) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_token')
		if len(photo_path) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_photo_path')
		if len(userIds_path) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_userIds_path')
		super(AddPhotoSpider, self).__init__(*args, **kwargs)
		self.token = token
		self.photos = [x for x in os.walk(photo_path)][0][2]
		self.photos = [x for x in self.photos if x.endswith(".jpg")]
		self.url_upload = "http://"+domain+"/photos/upload"
		self.url_create = "http://"+domain+"/photos/createTest"
		self.photo_path = photo_path
		with open(userIds_path, "r") as file:
			self.userIds = file.readlines()
			self.userIds = [x.rstrip() for x in self.userIds]

	def start_requests(self):
		headers = {
			"Authorization":"Bearer "+self.token
		}
		for photo in self.photos:
			# Upload photo
			file_field = { "files": (photo, open(self.photo_path+"/"+photo, 'rb'), 'image/jpeg', {'Expires': '0'})}
			res = requests.post(self.url_upload, headers = headers, files=file_field)

			# Create photo
			lat = photo.replace(".jpg", "").split("-")[0]
			lng = photo.replace(".jpg", "").split("-")[1]

			create_photo_header = {
				"Authorization":"Bearer "+self.token,
				"Content-Type":"application/json"
			}
			json_response = json.loads(res.content)

			if res.status_code == 500:
				print "Error 500: " + json_response["error"]
				raise scrapy.exceptions.CloseSpider('Err 500')
			if res.status_code == 403:
				print "Error 403: " + json_response["error"]
				raise scrapy.exceptions.CloseSpider('Err 403')
			userId = random.choice(self.userIds)
			photoUrl = json_response["url"]
			description = random.choice(_descriptions)

			request_body = {
				"locationQuery": {
					"query":{
						"range":{
							"lat": lat,
							"lng": lng,
							"radius": 1
						}
					}
					
				},
				"url": photoUrl,
				"description": description,
				"userId": userId
			}
			yield scrapy.http.Request(url = self.url_create, method = "POST", headers = create_photo_header, body = json.dumps(request_body), callback = self.parse)

	def parse(self, response):
		json_response = json.loads(response.body_as_unicode())
		if "id" in json_response:
			print "Added:", json_response["id"]
		else:
			print "Error response:", json.dumps(json_response, indent=4, sort_keys=True)
		yield json_response