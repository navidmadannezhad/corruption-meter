from django.shortcuts import render
from .scraper import get_corruption_data
from rest_framework.views import APIView
from django.http import JsonResponse
import json

class Get_data(APIView):
    def get(self, request):
        data = get_corruption_data()
        return JsonResponse(data, safe=False)