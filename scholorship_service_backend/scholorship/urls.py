from django.urls import path
from .views import ScholarshipListView

urlpatterns = [
    path('scholarship-list/', ScholarshipListView.as_view(),
         name='scholarship-list'),
]
