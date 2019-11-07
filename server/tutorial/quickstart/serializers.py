from django.contrib.auth.models import User,Group
from rest_framework import serializers
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password
from rest_framework_jwt.settings import api_settings
from .models import PhoneOtp,Hospital_Name,Rating,Enquiry,Message
from rest_framework.exceptions import ValidationError
from phone_verify.serializers import SMSVerificationSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    username=serializers.CharField(
        required=True,
        style={'placeholder':'Username'}
    )
    first_name=serializers.CharField(
        required=True,
        style={'placeholder':'First Name'}
    )
    last_name=serializers.CharField(
        required=True,
        style={'placeholder':'Last Name'}
    )
    email=serializers.EmailField(
        required=True,
        style={'placeholder':'Email'}
    )
    password = serializers.CharField(style={'input_type': 'password'},required=True,
                                     allow_blank=False,allow_null=False)
    confirm_password = serializers.CharField(style={'input_type':'password'},required=True)
    # password = serializers.CharField(
    #     write_only=True,
    #     required=True,
    #     # help_text='Leave empty if no change needed',
    #     style={'input_type': 'password', 'placeholder': 'Password'}
    # )
    class Meta:
        model=User
        fields=['url','username','first_name','last_name','email','password','confirm_password']

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise ValidationError("Password didn't matched ")
        if len(password) < 6:
            raise ValidationError("password of minimum 6 digit is required")
        else:
            return data
    
        email = data.get('email')
        try:
            match  = User.objects.get(email=email)
        except User.DoesNotExist:
            return data
        raise serializers.ValidationError('Email already exists')

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(allow_null=False,required=True)
    password = serializers.CharField(style={'input_type': 'password'},required=True,
                                     allow_blank=False,allow_null=False)

    class Meta:
        model = User
        fields = ('username','password')

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields=['url','full_name','Hospital','Degree','Years_of_Experience','Specialization','Contact','password','confirm_password','image']


class PhoneOtpSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneOtp
        fields =['otp']

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital_Name
        fields = ['hospital_name','image','street_name']

class RatingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Rating
        fields = ['user']
        
class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['Full_Name','age','gender','Specialist','Problem']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['author','content','timestamp']