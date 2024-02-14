from drf_yasg.utils import swagger_auto_schema
from rest_framework import views, permissions
from rest_framework.response import Response
from .models import Scholarship
from .serializers import ScholarshipSerializer


class ScholarshipListView(views.APIView):
    """
    Lists all available scholarships.
    """
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        operation_description="Retrieve a list of all available scholarships.",
        responses={200: ScholarshipSerializer(many=True)}
    )
    def get(self, request):
        """
        Provides a list of all the scholarships in a serialized format.
        """
        scholarships = Scholarship.objects.all()
        serializer = ScholarshipSerializer(scholarships, many=True)
        return Response(serializer.data)
