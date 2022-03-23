from django.shortcuts import render
from .scraper import get_corruption_data

def get_data(request):
    data = get_corruption_data()
    return data
