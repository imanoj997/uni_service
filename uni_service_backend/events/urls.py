from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('events-list/', EventListView.as_view(), name='event-list'),
    path('register/', RegisterForEventView.as_view(), name='event-register'),
]
