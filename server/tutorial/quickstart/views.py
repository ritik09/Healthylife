from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
import jwt,json
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import views
from rest_framework.response import Response
from django.template.loader import render_to_string
from .models import User,PhoneOtp
from rest_framework_jwt.settings import api_settings
from django.http import HttpResponse
from quickstart.serializers import UserSerializer, GroupSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import UserSerializer
from django.core.mail import send_mail
from tutorial.settings import EMAIL_HOST_USER
from random import *
from .models import PhoneOtp
from django.contrib.auth import authenticate, login
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
import random
from django.contrib.auth import get_user_model
User = get_user_model()


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

class SignUp(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        first_name = serializer.validated_data['first_name']
        last_name = serializer.validated_data['last_name']
        phone = serializer.validated_data['phone']
        user = User.objects.create_user(username=username,email=email,password=password,first_name=first_name,last_name=last_name,phone=phone)
        otp = randint(999,9999)
        data = PhoneOtp.objects.create(otp=otp,receiver=user)
        data.save()
        user.is_active = False
        user.save()
        subject = 'Activate Your Account'
        message = render_to_string('accountactivate.html', {
            'user': user,
            'OTP': otp,
         })
        from_mail = EMAIL_HOST_USER
        to_mail = [user.email]
        send_mail(subject, message, from_mail, to_mail, fail_silently=False)
        return Response({'details': 'Please confirm your otp to complete registration.',
                                'user_id': user.id })

# class validateotp(APIView):
#     def post(self,request,*args,**kwargs):
#         phone_number = request.data.get('phone')
#         if phone_number:
#             phone = str(phone_number)
#             user = User.objects.filter(phone_iexact=phone)
#             if user.exists():
#                 return Response({
#                     'detail':'phone number already exists',
#                 })
#             else:
#                 key = send_otp(phone)
#                 if key:
#                     PhoneOtp.objects.create(
#                         phone = phone,
#                         otp = key,
#                     )
#                 else:
#                     return Response({
#                         'status':True,
#                         'detail':'otp sent successfully'
#                     })
#         else:
#             return Response({
#             'detail':'phone number is not given'
#             })
# def send_otp(phone):
#     if phone:
#         key = random.randint(999,9999)
#         return key
#     else:
#         return False
