#!/usr/bin/python3
"""
    my scratch practice file
"""

my_dict = {"a": 1, "b": 2, "c": 3, "d": 4}

if my_dict:
    key_deleted = next(iter(my_dict.keys()))
    print(key_deleted)
    print("DISCARD: " + str(my_dict.pop(key_deleted)))
    print(my_dict)
else:
    print('Dictionary empty')
