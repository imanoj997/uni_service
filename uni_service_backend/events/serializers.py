from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for the Event model.

    Converts Event model instances to JSON format for API representation. 
    This serializer provides detailed information about each event.

    Attributes:
    - id: Unique ID of the event.
    - name: Name of the event.
    - ... [rest of the fields] ...
    """
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'image',
                  'location', 'event_date', 'event_time']


class EventRegistrationSerializer(serializers.Serializer):
    """
    Serializer for registering for an event.
    """
    event_id = serializers.IntegerField(required=True)
