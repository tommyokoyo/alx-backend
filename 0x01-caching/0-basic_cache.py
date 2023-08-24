#!/usr/bin/python3
"""
    BasicCaching module
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
        Caching system that Inherits from BaseCaching:
    """

    def put(self, key, item):
        """
            Assigns the item to the dictionary
            :param key:
            :param item:
            :return: No return value
        """
        if key is None or item is None:
            pass
        else:
            self.cache_data[key] = item

    def get(self, key):
        """
            returns the value in the self.cache_data
            :param key:
            :return: No return value
        """
        if key is None or self.cache_data.get(key) is None:
            return None
        else:
            return self.cache_data.get(key)
