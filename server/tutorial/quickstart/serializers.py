from django.contrib.auth.models import User,Group
from rest_framework import serializers
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password
from rest_framework_jwt.settings import api_settings
from .models import PhoneOtp
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
    phone=serializers.CharField(
        required=True,
        style={'placeholder':'Phone'}
    )
    password=serializers.CharField(
        required=True,
    )
    # password = serializers.CharField(
    #     write_only=True,
    #     required=True,
    #     # help_text='Leave empty if no change needed',
    #     style={'input_type': 'password', 'placeholder': 'Password'}
    # )


    class Meta:
        model=User
        fields=['url','username','first_name','last_name','email','phone','password']
    def validate(self, data):
    
        password = data.get('password')
        if len(password) < 6:
               raise ValidationError("password of minimum 6 digit is required")
        else:
            return data

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields=['url','name']

# class YourCustomSerializer(UserSerializer, SMSVerificationSerializer):
#     username=serializers.CharField(max_length=200)
#     email=serializers.EmailField(max_length=200) 
#     first_name=serializers.CharField(max_length=200)
#     last_name=serializers.CharField(max_length=200)
#     phone_number=serializers.CharField(max_length=12)
#     password=serializers.CharField(max_length=50) 
#     def get_serializer_class(self):
#         if self.action == 'verify_and_register':
#             return serializers.YourCustomSerializer
#         else:
#             return self.serializer_class

class PhoneOtpSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneOtp
        fields =['reciever','otp']