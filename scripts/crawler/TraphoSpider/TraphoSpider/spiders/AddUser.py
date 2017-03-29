# -*- coding: utf-8 -*-
import scrapy
import json
import logging
import random

logging.getLogger('scrapy').setLevel(logging.WARNING)

class AddUserSpider(scrapy.Spider):
	name = "AddUser"
	def __init__(self, token = "", domain="localhost:3000", number=1000, *args, **kwargs):
		if len(token) == 0:
			raise scrapy.exceptions.CloseSpider('unspecified_token')
		super(AddUserSpider, self).__init__(*args, **kwargs)
		self.token = token
		self.url = "http://"+domain+"/auth/signup"
		self.number = int(number)

	def start_requests(self):
		headers = {
			"Content-Type":"application/json"
		}
		names = []
		with open("names.txt", "r") as file:
			lines = file.readlines()
			names = [x.rstrip() for x in lines]
		selected_names = random.sample(names, self.number)
		for name in selected_names:
			body = {
				"username": name,
				"password": name
			}
			yield scrapy.http.Request(url = self.url, method = "POST", headers = headers, body = json.dumps(body), callback = self.parse)

	def parse(self, response):
		json_response = json.loads(response.body_as_unicode())
		if "id" in json_response:
			print "Added:", json_response["id"]
		else:
			print "Error response:", json.dumps(json_response, indent=4, sort_keys=True)
		yield json_response