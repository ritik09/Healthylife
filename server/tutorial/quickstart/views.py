from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
import jwt,json
from django.shortcuts import render
from django.utils.safestring import mark_safe
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import views
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from django.template.loader import render_to_string
from rest_framework import generics,viewsets,mixins
from .models import User,PhoneOtp,Hospital_Name
from rest_framework_jwt.settings import api_settings
from django.http import HttpResponse
from quickstart.serializers import UserSerializer, DoctorSerializer,HospitalSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.decorators import api_view
from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import UserSerializer,PhoneOtpSerializer,HospitalSerializer,EnquirySerializer
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


class SignUp(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        first_name = serializer.validated_data['first_name']
        last_name = serializer.validated_data['last_name']
        confirm_password = serializer.validated_data['confirm_password']
        user = User.objects.create_user(username=username,email=email,password=password,first_name=first_name,last_name=last_name,confirm_password=confirm_password)
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
                               'user_id': user.id})

class validateotp(APIView):
    serializer_class = PhoneOtpSerializer
    def post(self,request,user_id,*args,**kwargs):
        otp_verify =  PhoneOtpSerializer(data = request.data)
        otp_verify.is_valid(raise_exception=True)
        otp_verify = otp_verify.validated_data['otp']
        try:
            otp = PhoneOtp.objects.get(receiver=user_id)
        except(TypeError, ValueError, OverflowError, PhoneOtp.DoesNotExist):
                otp = None
        try:
            receiver = User.objects.get(id=user_id)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            receiver = None
        if otp is None or receiver is None:
            return Response({'error':'you are not a valid user'},status=status.HTTP_400_BAD_REQUEST)

        elif timezone.now() - otp.sent_on >= timedelta(days=0,hours=0,minutes=5,seconds=0):
            otp.delete()
            return Response({'detail':'OTP expired!',
                                 'user_id':user_id})
        if otp.otp == otp_verify:
            receiver.is_active = True
            receiver.save()
            otp.delete()
            return Response({'message': 'Thank you for otp Verification you are successfully logged in'},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error':'Invalid OTP',})

class resendotp(APIView):
    serializer_class = PhoneOtpSerializer
    def get(self,request,user_id,*args,**kwargs):
        try:
            user = User.objects.get(id=user_id)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is None:
            return Response({'error':'Not a valid user!'})
        otp = PhoneOtp.objects.filter(receiver=user)
        if otp:
            otp.delete()
        otp = randint(999, 9999)
        data = PhoneOtp.objects.create(otp=otp,receiver= user)
        data.save()
        subject = 'Activate Your Account'
        message = render_to_string('account_activate.html', {
            'user': user,
            'OTP': otp,
        })
        from_mail = EMAIL_HOST_USER
        to_mail = [user.email]
        send_mail(subject, message, from_mail, to_mail, fail_silently=False)
        return Response({'details': user.username +',Please confirm your otp to complete registration.',
                         'user_id': user_id },
                        status=status.HTTP_201_CREATED)

class HospitalViewSet(viewsets.ModelViewSet):
    queryset = Hospital_Name.objects.all()
    serializer_class = HospitalSerializer

    def get(self,request,format=None):
        users = Hospital_Name.objects.all()
        serializer = HospitalSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = HospitalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

def jwt_get_username_from_payload_handler(payload):
    return payload.get('username')


class Enquiry(APIView):
    serializer_class = EnquirySerializer
    def get(self,request,format=None):
        enquiry=Enquiry.objects.all()
    def post(self, request, format=None):
        serializer = EnquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DoctorEnquiry(APIView):
#     def get(self,request,format=None):
        
#         enquiry = Enquiry.objects.filter(Specialist=request.user.category)
   
def index(request):
    return render(request, 'quickstart/index.html', {})

@login_required
def room(request, room_name):
    return render(request, 'quickstart/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'username': mark_safe(json.dumps(request.user.username)),
    })