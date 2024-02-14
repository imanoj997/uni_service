from django.contrib import admin
from .models import StudyRoom, StudyRoomBooking

class StudyRoomAdmin(admin.ModelAdmin):
    list_display = ('room_name', 'floor_level', 'max_capacity')
    search_fields = ('room_name',)
    list_filter = ('floor_level',)
    ordering = ('room_name', 'floor_level')

class StudyRoomBookingAdmin(admin.ModelAdmin):
    list_display = ('room', 'booked_by', 'booked_date', 'start_time', 'end_time')
    search_fields = ('room__room_name', 'booked_by__username')
    list_filter = ('booked_date', 'room')
    ordering = ('booked_date', 'start_time')

admin.site.register(StudyRoom, StudyRoomAdmin)
admin.site.register(StudyRoomBooking, StudyRoomBookingAdmin)
