#!/usr/bin/env python3
"""
    Simple Pagination
"""
from typing import Tuple, List
import csv
import math


# noinspection DuplicatedCode
class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
            returns a list of baby names
            :param page:
            :param page_size:
            :return:
        """
        if not isinstance(page, int) or not isinstance(page_size, int):
            raise AssertionError
        elif page <= 0 or page_size <= 0:
            raise AssertionError
        else:
            page_range = index_range(page, page_size)
            dataSet = Server.dataset(self)
            return dataSet[page_range[0]: page_range[1]]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
            Returns a dictionary of:
            page_size: the length of the returned dataset
            page: the current page number
            data: the dataset page (equivalent to return from previous task)
            next_page: number of the next page, None if no next page
            prev_page: number of the previous page, None if no previous page
            total_pages: the total number of pages in the dataset as an integer
        """
        data_records = self.get_page(page, page_size)
        page_dict = math.ceil(len(self.__dataset)/page_size)

        return {
            'page_size': len(data_records),
            'page': page,
            'data': data_records,
            'next_page': page + 1 if (page + 1) <= page_dict else None,
            'prev_page': page - 1 if (page - 1) > 0 else None,
            'total_pages': page_dict
        }


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
        Function that returns a start and end index corresponding
        to the range of indexes
        :param page: Page number
        :param page_size: page content size
        :return: range of index
    """
    return (page - 1) * page_size, page * page_size
