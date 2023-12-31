#!/usr/bin/env python3
"""
    Simple Helper function
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
        Function that returns a start and end index corresponding
        to the range of indexes
        :param page: Page number
        :param page_size: page content size
        :return: range of index
    """
    return (page - 1) * page_size, page * page_size
