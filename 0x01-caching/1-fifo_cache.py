#!/usr/bin/python
"""
    FIFOCache cl ass
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
        FIFOCache class that inherits from BaseCaching
    """
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
            pass
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            if key in self.cache_data:
                self.cache_data[key] = item
            else:
                key_deleted = next(iter(self.cache_data.keys()))
                self.cache_data.pop(key_deleted)
                print("DISCARD: " + key_deleted)
                self.cache_data[key] = item
        else:
            self.cache_data[key] = item

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
                return retrieved_data
