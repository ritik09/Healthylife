from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
import jwt,json
from django.shortcuts import render
from django.utils.safestring import mark_safe
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import permissions
from rest_framework import views
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from django.template.loader import render_to_string
from rest_framework import generics,viewsets,mixins
from .models import User,PhoneOtp,Doctor
from rest_framework_jwt.settings import api_settings
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse
from quickstart.serializers import UserSerializer1,MessageSerializer,LoginSerializer,UserSerializer2,AppointmentSerializer,AcceptRejectAppointmentSerializer,EnquirySerializer,ReplySerializer,UserProfileChangeSerializer,HospitalProfileChangeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.decorators import api_view
from django.utils import timezone
from rest_framework import generics, mixins, permissions
from datetime import timedelta
from .models import Message
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import status,permissions
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer1,UserSerializer2,PhoneOtpSerializer,EnquirySerializer,DoctorSerializer,RatingSerializer
from django.core.mail import send_mail
from tutorial.settings import EMAIL_HOST_USER
from random import *
from .models import PhoneOtp,Doctor,PhoneOtp,Appointment,Message,Rating,Enquiry,ReplyEnquiry
from django.contrib.auth import authenticate, login
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
import random
from django.contrib.auth import get_user_model
User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.filter(street_name__isnull=True)
    serializer_class = UserSerializer2

    def get(self,request,format=None):
        users = User.objects.all()
        serializer = UserSerializer2(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignUp(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class =UserSerializer1
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer1(data = request.data)
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
        message = render_to_string('quickstart/accountactivate.html', {
            'user': user,
            'OTP': otp,
         })
        from_mail = EMAIL_HOST_USER
        to_mail = [user.email]
        send_mail(subject, message, from_mail, to_mail, fail_silently=False)
        return Response({'details': 'Please confirm your otp to complete registration.',
                               'user_id': user.id})

class validateotp(APIView):
    permission_classes = (permissions.AllowAny,)
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

        elif timezone.now() - otp.sent_on >= timedelta(days=0,hours=0,minutes=2,seconds=0):
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

class resendotp(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
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

class Sign_Up_Hospital(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer2
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer2(data = request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        hospital_name = serializer.validated_data['hospital_name']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        confirm_password = serializer.validated_data['confirm_password']
        image = serializer.validated_data['image']
        street_name=serializer.validated_data['street_name']
        user = User.objects.create_user(username=username,hospital_name=hospital_name,email=email,password=password,confirm_password=confirm_password,image=image,street_name=street_name)
        otp = randint(999,9999)
        data = PhoneOtp.objects.create(otp=otp,receiver=user)
        data.save()
        user.is_active = False
        user.save()
        subject = 'Activate Your Account'
        message = render_to_string('quickstart/accountactivate.html', {
            'user': user,
            'OTP': otp,
         })
        from_mail = EMAIL_HOST_USER
        to_mail = [user.email]
        send_mail(subject, message, from_mail, to_mail, fail_silently=False)
        return Response({'details': 'Please confirm your otp to complete registration.',
                               'user_id': user.id})

class HospitalViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    parser_classes = (MultiPartParser, FormParser)
    queryset = User.objects.filter(street_name__isnull=False)
    serializer_class = UserSerializer2
    def get(self,request,*args,**kwargs):
        users = User.objects.all()
        serializer = UserSerializer2(users, many=True)
        return Response(serializer.data)
    def post(self, request, *args,**kwargs):
        serializer = UserSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorView(APIView):
    serializer_class = DoctorSerializer
    def post(self,request,user_id,*args,**kwargs): 
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HospitalProfile(APIView):
    def get(self,request,user_id,*args,**kwargs):
        user = User.objects.get(id=user_id)
        doctor = Doctor.objects.filter(hospital__username = user)
        serializer = DoctorSerializer(doctor, many=True)
        return Response(serializer.data)
    def post(self,request,user_id,*args,**kwargs):
        user = User.objects.get(id=user_id)
        doctor = Doctor.objects.filter(hospital__username = user)
        serializer = DoctorSerializer(doctor, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class MessageView(APIView):
    def get(self,request,*args,**kwargs):
        message = Message.objects.all()
        serializer = MessageSerializer(message,many=True)
        return Response(serializer.data)
    def post(self, request, *args,**kwargs):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Make_Enquiry(APIView):
    serializer_class = EnquirySerializer
    def post(self, request, *args,**kwargs):
        serializer = EnquirySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnquiryView(APIView):
    serializer_class = ReplySerializer
    def post(self, request, *args,**kwargs):
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request,user_id, *args,**kwargs):
        user = User.objects.get(id=user_id)
        enquiry = Enquiry.objects.filter(hospital_name__username = user)
        serializer = EnquirySerializer(enquiry, many=True)
        return Response(serializer.data)

class Patient_EnquiryView(APIView):
     def get(self, request,user_id, *args,**kwargs):
        user = User.objects.get(id=user_id)
        enquiry =  ReplyEnquiry.objects.filter(username = user)
        serializer = ReplySerializer(enquiry, many=True)
        return Response(serializer.data)

class Make_Appointment(APIView):
    serializer_class = AppointmentSerializer
    # parser_classes = (MultiPartParser, FormParser,)
    # def get_object(self):
    #     username = self.kwargs["username"]
    #     obj = get_object_or_404(User, username=username)
    #     return obj

    def post(self,request,user_id,*args,**kwargs): 
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentView(APIView):
    def get(self,request,user_id,*args,**kwargs):
        user = User.objects.get(id=user_id)
        doctor = Appointment.objects.filter(hospital_name__username = user)
        serializer = AppointmentSerializer(doctor, many=True)
        return Response(serializer.data)
    def post(self, request,user_id, *args,**kwargs):
        user = User.objects.get(id=user_id)
        appointment = Appointment.objects.filter(hospital_name__username=user)
        serializer = AppointmentSerializer(appointment,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AppointmentProfileView(APIView):
    serializer_class = AcceptRejectAppointmentSerializer
    def get(self,request,*args,**kwargs):
        status = self.kwargs['status']
        if status == 'accept':
            return Response({'Your appointment has been approved'})
        elif status == 'reject':
            return Response({'Your appointment has been cancelled'})
 
class UserProfileChangeAPIView(generics.RetrieveAPIView,
                               mixins.DestroyModelMixin,
                               mixins.UpdateModelMixin):
    # permission_classes = (
    #     permissions.IsAuthenticated,
    #     UserIsOwnerOrReadOnly,
    # )
    serializer_class = UserProfileChangeSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def get_object(self):
        username = self.kwargs["username"]
        obj = get_object_or_404(User, username=username)
        return obj

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

class UserProfileChangeHospitalAPIView(generics.RetrieveAPIView,
                               mixins.DestroyModelMixin,
                               mixins.UpdateModelMixin):
    # permission_classes = (
    #     permissions.IsAuthenticated,
    #     UserIsOwnerOrReadOnly,
    # )
    serializer_class = HospitalProfileChangeSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def get_object(self):
        username = self.kwargs["username"]
        obj = get_object_or_404(User, username=username)
        return obj

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

def index(request):
    return render(request, 'quickstart/index.html', {})

@login_required
def room(request, room_name):
    return render(request, 'quickstart/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name)),
        'username': mark_safe(json.dumps(request.user.username)),
    })

class HospitalRating(APIView):
    serializer_class = RatingSerializer
    def get_serializer_class(self):
        if self.action == 'submit_rating':
            return RatingSerializer

    @action(methods=['get'],detail=True)
    def rating(self,*args,**kwargs):
        hospital_id = self.kwargs['pk']
        all_rating = Rating.objects.all()
        total_rating = all_rating.count()
        avg_rating = 0
        rating_count = 0
        for rate in all_rating:
            rating_count += rate.star
        avg_rating = rating_count/(total_rating+1)
        if not self.request.user.is_anonymous:
            try:
                rated = Rating.objects.get(user=self.request.user,hospital=hospital_id)
            except (Rating.DoesNotExist):
                rated =None
            if rated is None:
                return Response({'status':False,'avg_rating':avg_rating})
            return Response({'status':True,'avg_rating':avg_rating})
        else:
            return Response({'avg_rating':avg_rating})

    @action(methods=['POST'],detail=True)
    def submit_rating(self,request,*args,**kwargs):
        hospital_id = self.kwargs['pk']
        hospital = User.objects.get(id=hospital_id)
        try:
            rated = Rating.objects.get(user=self.request.user,hospital=hospital)
        except (Rating.DoesNotExist):
            rated =None
        if rated is None:
            rating = RatingSerializer(data=request.data)
            if rating.is_valid(raise_exception=True):
                rating.save(user=request.user,hospital=hospital)
                return Response("rated")
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class Cardiologists(APIView):
       def post(self, request, *args,**kwargs):
        doctor = Doctor.objects.filter(Specialization=Cardiologists)
        serializer = DoctorSerializer(doctor,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Endocrinologists(APIView):
       def post(self, request, *args,**kwargs):
        doctor = Doctor.objects.filter(Specialization=Endocrinologists)
        serializer = DoctorSerializer(doctor,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Dermatalogist(APIView):
       def post(self, request, *args,**kwargs):
        doctor = Doctor.objects.filter(Specialization=Dermatalogist)
        serializer = DoctorSerializer(doctor,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Immunologists(APIView):
       def post(self, request, *args,**kwargs):
        doctor = Doctor.objects.filter(Specialization=Immunologists)
        serializer = DoctorSerializer(doctor,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Neurologist(APIView):
       def post(self, request, *args,**kwargs):
        doctor = Doctor.objects.filter(Specialization=Neurologist)
        serializer = DoctorSerializer(doctor,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Pathologist(APIView):
       def post(self, request, *args,**kwargs):
        doctor = Doctor.objects.filter(Specialization=Pathologist)
        serializer = DoctorSerializer(doctor,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Psychiatrists(APIView):
    def post(self, request, *args,**kwargs):
        doctor = Doctor.objects.filter(Specialization=Psychiatrists)
        serializer = DoctorSerializer(doctor,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

