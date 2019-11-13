from django.contrib.auth.models import User,Group
from rest_framework import serializers
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password
from rest_framework_jwt.settings import api_settings
from rest_framework.validators import UniqueValidator
from .models import PhoneOtp,Rating,Enquiry,Message,Doctor,Appointment,AppointmentType,ReplyEnquiry
from rest_framework.exceptions import ValidationError
from phone_verify.serializers import SMSVerificationSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer1(serializers.ModelSerializer):
    username=serializers.CharField(
        required=True,
        allow_blank=False,
        style={'placeholder':'Username'},
        validators=[UniqueValidator(queryset=User.objects.all(),
        message='Username already in use',
        lookup='exact')]

    )

    first_name=serializers.CharField(
        required=True,
        style={'placeholder':'first Name'}
    )
    last_name=serializers.CharField(
        required=True,
        style={'placeholder':'Last Name'}
    )
    email=serializers.EmailField(
        required=True,
        allow_null=False,
        style={'placeholder':'Email'},
        validators=[UniqueValidator(queryset=User.objects.all(),
        message ='Email already in use',
        lookup='exact')]
        
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

class UserSerializer2(serializers.ModelSerializer):
    username=serializers.CharField(
        required=True,
        allow_blank=False,
        style={'placeholder':'Username'},
        validators=[UniqueValidator(queryset=User.objects.all(),
        message='Username already in use',
        lookup='exact')]

    )
    hospital_name=serializers.CharField(
        required=True,
        style={'placeholder':'Hospital_name'}
    )
    email=serializers.EmailField(
        required=True,
        allow_null=False,
        style={'placeholder':'Email'},
        validators=[UniqueValidator(queryset=User.objects.all(),
        message ='Email already in use',
        lookup='exact')]
        
    )
    password = serializers.CharField(style={'input_type': 'password'},required=True,
                                     allow_blank=False,allow_null=False)
    confirm_password = serializers.CharField(style={'input_type':'password'},required=True)
    image =serializers.ImageField(max_length=None)
    street_name = serializers.CharField(max_length=100)

    class Meta:
        model=User
        fields=['url','username','hospital_name','email','password','confirm_password','image','street_name']

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise ValidationError("Password didn't matched ")
        if len(password) < 6:
            raise ValidationError("password of minimum 6 digit is required")
        else:
            return data

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields=('first_name','last_name','Years_of_Experience','Qualification','Specialization','Contact','image','hospital')

    def validate_contact(self,contact):
        if len(contact)>10:
            raise serializers.ValidationError("Please enter a valid phone number")
        elif len(contact)<10:
            raise serializers.ValidationError("Please enter a valid phone number")
        else:
            return contact
        
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields=('username','email','contact','gender','doctor_name','hospital_name')

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(allow_null=False,required=True)
    password = serializers.CharField(style={'input_type': 'password'},required=True,
                                     allow_blank=False,allow_null=False)

    class Meta:
        model = User
        fields = ('username','password')

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields =('user','star')


class AcceptRejectAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentType
        fields =('Accepted','Rejected','timestamp')

class PhoneOtpSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneOtp
        fields =['otp']

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['username','age','gender','Problem','hospital_name']

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyEnquiry
        fields = ['reply','username']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['author','content','timestamp']

class UserProfileChangeSerializer(serializers.ModelSerializer):
     class Meta:
        model = User
        fields=['username','first_name','last_name','email','password','confirm_password']

class HospitalProfileChangeSerializer(serializers.ModelSerializer):
     class Meta:
        model = User
        fields=['username','hospital_name','email','password','confirm_password','image','street_name']