from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
import jwt,json
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import views
from rest_framework.response import Response

from rest_framework_jwt.settings import api_settings
from django.http import HttpResponse
from quickstart.serializers import UserSerializer, GroupSerializer,LoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
from django.contrib.auth import get_user_model
User = get_user_model()

# @api_view(['GET'])
# def current_user(request):
#     serializer = UserSerializer(request.user)
#     return Response(serializer.data)

# class UserList(APIView):
#     permission_classes = (permissions.AllowAny,)
#     def post(self, request, format=None):
#         serializer = UserSerializerWithToken(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class CustomAuthToken(ObtainAuthToken):
    
#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data,
#                                            context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key,
#             'user_id': user.pk,
#             'email': user.email
#         })
# class usertoken(ObtainAuthToken):
#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data,
#                                            context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
        
#         return Response('obtain_jwt_token')
            
        

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def get(self,request,format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupViewSet(viewsets.ModelViewSet):
    
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class LoginView(views.APIView):
    # permission_classes = (permissions.AllowAny, )
    # def post(self,request):
    #     user = request.data.get('user')
    #     if not user:
    #         return Response({'response' : 'error', 'message' : 'No data found'})
    #     serializer = LoginSerializer(data = user)
    #     if serializer.is_valid():
    #         saved_user = serializer.save()
    #     else:
    #         return Response({"response" : "error", "message" : serializer.errors})
    #     return Response({"response" : "success", "message" : "user created succesfully"})
    # def post(self, request, *args, **kwargs):
    #     username = request.data.get("username", "")
    #     password = request.data.get("password", "")
    #     user = authenticate(request, username=username, password=password)
    #     if user is not None:
    #         # login saves the user’s ID in the session,
    #         # using Django’s session framework.
    #         login(request, user)
    #         serializer = LoginSerializer(data={
    #             # using drf jwt utility functions to generate a token
    #             "token": jwt_encode_handler(
    #                 jwt_payload_handler(user)
    #             )})
    #         serializer.is_valid()
    #         return Response(serializer.data)
    #     return Response(status=status.HTTP_401_UNAUTHORIZED)
    # queryset=User.objects.all().order_by('-date_joined')
    # serializer_class = UserSerializer

    # def get(self,request,format=None):
    #     users = User.objects.all()
    #     serializer = LoginSerializer(users, many=True)
    #     return Response(serializer.data)
    # serializer_class = LoginSerializer
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        if not request.data:
            return Response({'Error': "Please provide username/password"}, status="400")
        
        username = request.data['username']
        password = request.data['password']
        try:
            user = User.objects.get(username=username, password=password)
        except User.DoesNotExist:
            return Response({'Error': "Invalid username/password"}, status="400")
        if user:
            payload = {
                'id': user.id,
                'email': user.email,
            }
            jwt_token = {'token': jwt.encode(payload, "SECRET_KEY")}

            return HttpResponse(
              json.dumps(jwt_token),
              status=200,
              content_type="application/json"
            )
        else:
            return Response(
              json.dumps({'Error': "Invalid credentials"}),
              status=400,
              content_type="application/json"
            )
        # return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    

    