# -*- coding: utf-8 -*-
import json
from scrapy.exceptions import DropItem

class GoogleplacespiderPipeline(object):
	def __init__(self):
		self.items = {}
 
	def close_spider(self, spider):
		print "***saving result..."
		with open("Places_Google.json", 'w') as f:
			f.write(json.dumps(self.items.values(), indent=4, sort_keys=True))
 
	def process_item(self, item, spider):
		place_id = item["google_place_id"]
		del item["google_place_id"]
		if place_id not in self.items:
			self.items[place_id] = item
		return item