from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class RegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.

    Converts user data to JSON format for the creation of new users. Passwords are write-only for security.

    Attributes:
    - username: Desired username for the new user.
    - email: Email address of the new user.
    - password: Password for the new user (write-only).
    """
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
