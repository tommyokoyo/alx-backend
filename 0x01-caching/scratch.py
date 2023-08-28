#!/usr/bin/python3
"""
    my scratch practice file
"""

my_dict = {"a": 1, "b": 2, "c": 3, "d": 4}

if my_dict:
    print("DISCARD: " + str(my_dict.popitem()[0]))
    print(my_dict)
else:
    print('Dictionary empty')
