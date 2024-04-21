from rest_framework.response import Response
from rest_framework import pagination

class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(data)