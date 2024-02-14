from rest_framework import serializers
from .models import Scholarship


class ScholarshipSerializer(serializers.ModelSerializer):
    """
    Serializer for the Scholarship model.

    Converts Scholarship model instances to JSON format for API representation.
    """
    class Meta:
        model = Scholarship
        fields = ['id', 'name', 'amount', 'image', 'study_area',
                  'course_type', 'description', 'deadline', 'terms_and_conditions']
