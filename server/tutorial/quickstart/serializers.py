from django.contrib.auth.models import User,Group
from rest_framework import serializers
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password
from rest_framework_jwt.settings import api_settings
from rest_framework.validators import UniqueValidator
from .models import PhoneOtp,Rating,Enquiry,Message,Doctor,Appointment,AppointmentType,ReplyEnquiry,Specialization
from rest_framework.exceptions import ValidationError
from phone_verify.serializers import SMSVerificationSerializer
from rest_auth.serializers import LoginSerializer as RestAuthLoginSerializer
from django.contrib.auth.hashers import make_password
from multiselectfield import MultiSelectField
from multiselectfield import MultiSelectField
from django.contrib.auth import get_user_model
User = get_user_model()

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')

            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

class UserSerializer1(serializers.ModelSerializer):
    # username=serializers.CharField(
    #     required=True,
    #     allow_blank=False,
    #     style={'placeholder':'Username'},
    #     validators=[UniqueValidator(queryset=User.objects.all(),
    #     message='Username already in use',
    #     lookup='exact')]

    # )
    name=serializers.CharField(
        required=True,
        style={'placeholder':'Name'}
    )
    # last_name=serializers.CharField(
    #     required=True,
    #     style={'placeholder':'Last Name'}
    # )
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
        fields=['url','id','name','email','password','confirm_password']

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise ValidationError("Password didn't matched ")
        if len(password) < 6:
            raise ValidationError("password of minimum 6 digit is required")
        else:
            return data

class SpecializationSerializer(serializers.RelatedField):
    class Meta:
        model=Specialization
        fields='__all__'

class UserSerializer2(serializers.ModelSerializer):
    # username=serializers.CharField(
    #     required=True,
    #     allow_blank=False,
    #     style={'placeholder':'Username'},
    #     validators=[UniqueValidator(queryset=User.objects.all(),
    #     message='Username already in use',
    #     lookup='exact')]

    # )
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
    image = Base64ImageField(max_length=None)
    street_name = serializers.CharField(max_length=100)
    specialization = SpecializationSerializer(read_only=True, many=True)
    class Meta:
        model=User
        fields=['hospital_name','email','password','confirm_password','street_name','image','specialization','id']

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password != confirm_password:
            raise ValidationError("Password didn't matched ")
        if len(password) < 6:
            raise ValidationError("password of minimum 6 digit is required")
        else:
            return data


class LoginSerializer(RestAuthLoginSerializer):
    username=None
    class Meta:
        fields=['email','password']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields=('first_name','last_name','Years_of_Experience','Qualification','Specialization','Contact','hospital','id','image')

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
        fields=('contact','first_name','last_name','hospital_name')

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
        fields = ['Query','contact','hospital_name','id']

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReplyEnquiry
        fields = ['enquiry','reply','id','hospital_name']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['author','content','timestamp']

class UserProfileChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['first_name','last_name','email','password','confirm_password']

    validate_password = make_password

class HospitalProfileChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['hospital_name','email','password','confirm_password','street_name','image']

    validate_password = make_password

class doctorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Doctor
        image = Base64ImageField(max_length=None)
        fields =['first_name','last_name','Years_of_Experience','Qualification','Specialization','Contact','hospital','id','image']