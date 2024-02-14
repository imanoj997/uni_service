from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import StudyRoom, StudyRoomBooking
from .serializers import StudyRoomSerializer, StudyRoomBookingSerializer


class StudyRoomAvailabilityView(APIView):
    """
    Endpoint to check the availability of study rooms.

    Clients can verify if a specific study room is available on a certain date and time.

    Parameters:
    - date: The desired booking date.
    - start_hour: The desired start hour for the booking.

    Returns:
    - A list of rooms with their availability status.
    """

    @swagger_auto_schema(
        operation_description="Check if a study room is available on a specific date and start hour.",
        query_serializer=None,
        manual_parameters=[
            openapi.Parameter('date', in_=openapi.IN_QUERY, description='Booking date YYYY-MM-DD',
                              type=openapi.TYPE_STRING, format="date", required=True),
            openapi.Parameter('start_hour', in_=openapi.IN_QUERY,
                              description='Start hour for the booking (e.g., 12 for 12:00)', type=openapi.TYPE_INTEGER, required=True),
        ],
        responses={200: StudyRoomSerializer()}
    )
    def get(self, request):
        booking_date = request.query_params.get('date')
        start_hour = request.query_params.get('start_hour')

        # Convert start_hour to a proper time format (HH:MM:SS)
        if start_hour and start_hour.isdigit():
            start_time = f"{int(start_hour):02d}:00:00"
        else:
            return Response({"error": "start_hour should be a valid hour."}, status=status.HTTP_400_BAD_REQUEST)

        # Check required parameters
        if not all([booking_date, start_time]):
            return Response({"error": "date and start_hour are required parameters."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch room booking data
        all_bookings = StudyRoom.objects.all()
        serializer = StudyRoomSerializer(all_bookings, many=True, context={
                                         'booking_date': booking_date, 'start_time': start_time})
        return Response(serializer.data)


class StudyRoomBookingCreateView(APIView):
    """
    Endpoint to book a study room.

    Clients can make a booking for a specific room, date, and time range.

    Parameters:
    - room: ID of the desired study room.
    - booked_by: ID of the user making the booking.
    - booked_date: Desired date of the booking.
    - start_time: Desired start time of the booking.

    Returns:
    - Details of the booking upon success.
    """

    @swagger_auto_schema(
        operation_description="Make a booking for a study room.",
        request_body=StudyRoomBookingSerializer,
        responses={200: StudyRoomBookingSerializer(), 400: "Bad Request"}
    )
    def post(self, request):
        serializer = StudyRoomBookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
