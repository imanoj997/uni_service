from datetime import time
from rest_framework import serializers
from .models import StudyRoom, StudyRoomBooking


class StudyRoomSerializer(serializers.ModelSerializer):
    """
    Serializer for the StudyRoom model.

    Converts StudyRoom model instances to JSON format. Includes availability based on provided context.

    Attributes:
    - room_id: Unique ID of the room.
    - room_name: Name of the room.
    - ... [rest of the fields] ...
    """
    is_available = serializers.SerializerMethodField()
    room_id = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = StudyRoom
        fields = ['room_id', 'room_name', 'floor_level',
                  'description', 'max_capacity', 'image', 'is_available']
        extra_kwargs = {'room_id': {'read_only': True}}

    def get_is_available(self, obj):
        # Extract date and start_time from the serializer context
        booking_date = self.context.get('booking_date')

        # Convert start_hour to time format
        start_hour = self.context.get('start_time').split(":")[
            0]  # Extract the hour part
        start_time = time(hour=int(start_hour))

        # Check for overlapping bookings for this room
        overlapping_bookings = obj.bookings.filter(
            booked_date=booking_date,
            start_time=start_time,
        )
        return not overlapping_bookings.exists()


class StudyRoomBookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyRoomBooking
        fields = ['room', 'booked_by', 'booked_date', 'start_time', 'end_time']
        extra_kwargs = {'end_time': {'read_only': True}}
