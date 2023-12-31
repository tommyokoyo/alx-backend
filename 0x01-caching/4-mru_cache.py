#!/usr/bin/python
"""
    MRU cache class
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
        MRUcache class that inherits from BaseCaching
        discards the most recently used items in the cache

    """
    usage_counter = {}

    def __init__(self):
        """
            initialize
        """
        super().__init__()

    def put(self, key, item):
        """
            check if the key/item is None and assigns it to
            the dict
            :param key:
            :param item:
            :return: No return value
        """
        if key is None or item is None:
            return
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            if key in self.cache_data.keys():
                self.cache_data[key] = item
                self.usage_counter[key] = 0
            else:
                most_used_key = max(self.usage_counter, key=self.usage_counter.get)
                del self.cache_data[most_used_key]
                del self.usage_counter[most_used_key]
                print("DISCARD: " + most_used_key)
                self.cache_data[key] = item
                self.usage_counter[key] = 0
        else:
            self.cache_data[key] = item
            self.usage_counter[key] = 0

    def get(self, key):
        """
            retrieves the self.cached_data linked to key
            :param key:
            :return: self.cached_data[key]
        """
        if key is None:
            return None
        else:
            retrieved_data = self.cache_data.get(key)
            if retrieved_data is None:
                return None
            else:
                self.usage_counter[key] += 1
                return retrieved_data
