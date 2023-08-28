#!/usr/bin/python
"""
    FIFOCache cl ass
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
        FIFOCache class that inherits from BaseCaching
    """
    last_key_added = ''

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
            if key in self.cache_data.keys():
                if key == self.last_key_added:
                    del self.cache_data[self.last_key_added]
                    print("DISCARD: " + self.last_key_added)
                    self.cache_data[key] = item
                    self.last_key_added = key
                else:
                    self.cache_data[key] = item
                    self.last_key_added = key
            else:
                del self.cache_data[self.last_key_added]
                print("DISCARD: " + self.last_key_added)
                self.cache_data[key] = item
                self.last_key_added = key
        else:
            self.cache_data[key] = item
            self.last_key_added = key

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
