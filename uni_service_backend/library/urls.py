from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('room_availability/', StudyRoomAvailabilityView.as_view(), name='room-availability'),
    path('book_room/', StudyRoomBookingCreateView.as_view(), name='book-room'),
]
