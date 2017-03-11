# -*- coding: utf-8 -*-
import json

class GoogleplacespiderPipeline(object):
	def __init__(self):
		self.items = []
 
	def close_spider(self, spider):
		print "***saving result..."
		with open("Places_Google.json", 'a') as f:
			f.write(json.dumps(self.items, indent=4, sort_keys=True))
 
	def process_item(self, item, spider):
		self.items.append(item)
		return item