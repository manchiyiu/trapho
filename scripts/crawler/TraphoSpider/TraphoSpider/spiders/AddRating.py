# -*- coding: utf-8 -*-
import scrapy
import json
import logging
from random import randint

logging.getLogger('scrapy').setLevel(logging.WARNING)

class AddRatingSpider(scrapy.Spider):
	name = "AddRating"
	handle_httpstatus_list = [403]
	def __init__(self, token = "", photos_path = "", domain="localhost:3000", *args, **kwargs):
		if len(token) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_token')
		if len(photos_path) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_photoIds_path')
		super(AddRatingSpider, self).__init__(*args, **kwargs)
		self.token = token
		self.domain = domain
		with open(photos_path) as photos_file:	
			self.photos = json.load(photos_file)
		print("***No. of photos:", len(self.photos))
		


	def start_requests(self):
		headers = {
			"Content-Type": "application/json",
			"Authorization": "Bearer "+self.token
		}
		for photo in self.photos:
			#print(photo)
			body = {
				"userId": photo["userId"],
				"locationId": photo["locationId"],
				"rating": randint(0, 10),
				"photoId": photo["id"]
			}

			yield scrapy.http.Request(url = "https://"+self.domain+"/ratings", method = "POST", headers = headers, body = json.dumps(body), callback = self.parse)

	def parse(self, response):
		json_response = json.loads(response.body_as_unicode())
		if "id" in json_response:
			print "Added:", json_response["id"]
		else:
			print "Error response:", json.dumps(json_response, indent=4, sort_keys=True)
		yield json_response