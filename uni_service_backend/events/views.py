from rest_framework import views, status, permissions
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import Event, EventRegistration
from .serializers import EventSerializer, EventRegistrationSerializer


class EventListView(views.APIView):
    """
    Lists all available events.

    This view provides a list of all the events in a serialized format.

    Returns:
    - A list of events with details like ID, name, description, image, location, and timing.
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Retrieve a list of all available events.",
        responses={200: EventSerializer(many=True)}
    )
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class RegisterForEventView(views.APIView):
    """
    Allows users to register for a specific event.

    Users can register for an event using their authentication token. 
    The view checks if the user is already registered before confirming the registration.

    Parameters:
    - event_id: The ID of the event the user wants to register for.

    Returns:
    - Confirmation of registration or error messages if registration fails.
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Register for a specific event using the event_id.",
        request_body=EventRegistrationSerializer,  # We specify the request body here
        responses={
            201: "Registered successfully.",
            400: "Error or already registered.",
            404: "Event does not exist."
        }
    )
    def post(self, request):
        event_id = request.data.get('event_id')
        try:
            event = Event.objects.get(id=event_id)
            registration, created = EventRegistration.objects.get_or_create(
                user=request.user, event=event)
            if created:
                return Response({"message": "Registered successfully."}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "Already registered."}, status=status.HTTP_400_BAD_REQUEST)
        except Event.DoesNotExist:
            return Response({"message": "Event does not exist."}, status=status.HTTP_404_NOT_FOUND)
