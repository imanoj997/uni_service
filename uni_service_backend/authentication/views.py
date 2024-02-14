from rest_framework import status, views, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import RegistrationSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class RegisterView(views.APIView):
    """
    Endpoint to handle user registration.

    Allows clients to register by providing a username, email, and password.

    Parameters:
    - username: Desired username.
    - email: User's email address.
    - password: Desired password.

    Returns:
    - User details upon successful registration.
    """

    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        request_body=RegistrationSerializer
    )
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomLoginToken(views.APIView):
    """
    Authenticate a user and return a token along with user details.

    Parameters:
    - username: The username of the registered user.
    - password: The password of the registered user.

    Returns:
    - token: The authentication token for future requests.
    - user_id: The ID of the authenticated user.
    - email: The email address of the authenticated user.
    - first_name: The first name of the authenticated user.
    - last_name: The last name of the authenticated user.
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = AuthTokenSerializer

    @swagger_auto_schema(
        operation_description="Authenticate a user and obtain token.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['username', 'password'],
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Username'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Password'),
            },
        ),
        responses={
            200: openapi.Response(description="Token and user details", schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'token': openapi.Schema(type=openapi.TYPE_STRING, description='Token'),
                    'user_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='User ID'),
                    'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email'),
                    'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='First Name'),
                    'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='Last Name'),
                }
            )),
            400: "Invalid input, username, and password required."
        }
    )
    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        })
