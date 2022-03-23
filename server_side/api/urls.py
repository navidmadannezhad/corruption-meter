from django.urls import path
from .views import Get_data

urlpatterns = [
    path('get-data/', Get_data.as_view())
]
