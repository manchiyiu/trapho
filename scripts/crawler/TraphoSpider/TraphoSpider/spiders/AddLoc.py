# -*- coding: utf-8 -*-
import scrapy
import json
import logging

logging.getLogger('scrapy').setLevel(logging.WARNING)

class AddlocSpider(scrapy.Spider):
	name = "AddLoc"
	def __init__(self, token = "", json_path = "", domain="localhost:3000", *args, **kwargs):
		if len(token) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_token')
		if len(json_path) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_json_path')
		super(AddlocSpider, self).__init__(*args, **kwargs)
		self.token = token
		with open(json_path) as locations_file:	
			self.locations = json.load(locations_file)
		self.url = "http://"+domain+"/locations"

	def start_requests(self):
		headers = {
			"Authorization":"Bearer "+self.token,
			"Content-Type":"application/json"
		}
		for location in self.locations:
			yield scrapy.http.Request(url = self.url, method = "POST", headers = headers, body = json.dumps(location), callback = self.parse)

	def parse(self, response):
		json_response = json.loads(response.body_as_unicode())
		if "id" in json_response:
			print "Added:", json_response["id"]
		else:
			print "Error response:", json.dumps(json_response, indent=4, sort_keys=True)
		yield json_response