
from django.contrib.auth.models import User,Group
from rest_framework import serializers
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.hashers import make_password
from rest_framework_jwt.settings import api_settings
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
    # password = serializers.CharField(
    #     write_only=True,
    #     required=True,
    #     # help_text='Leave empty if no change needed',
    #     style={'input_type': 'password', 'placeholder': 'Password'}
    # )


    class Meta:
        model=User
        fields=['url','username','first_name','last_name','email','phone_number','password']

    def create(self, validated_data):
        fields = ['username', 'password', 'email','first_name','last_name','phone_number']
        data = {f: validated_data.get(f) for f in fields}

        return User.objects.create_user(**data)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Group
        fields=['url','name']

class LoginSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(write_only=True)
    # token = serializers.SerializerMethodField()
    # def get_token(self, object):
    #     jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    #     jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
    #     payload = jwt_payload_handler(object)
    #     token = jwt_encode_handler(payload)
    #     return token
    # def create(self, validated_data):
    #     user = User.objects.create(
    #         username = validated_data['username'],
    #     )
    #     user.set_password(validated_data['password'])
    #     user.save()
    #     return user
    class Meta:
        model = User
        fields = ('url','username', 'password')
        
    # token = serializers.CharField(max_length=255)

    # username=serializers.CharField(
    #     required=True,
    #     style={'placeholder':'Username'}
    # )
    # class Meta:
    #     model = User
    #     fields =['username','password']
# class UserSerializer(serializers.ModelSerializer):
    
#     email = serializers.EmailField(max_length=100)
#     class Meta:
#         model = User
#         fields =  ['url', 'username', 'email', 'groups','password']
#     validate_password = make_password
        
# class GroupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Group
#         fields = ['url', 'username','email','password']

    # class Meta:
    #     model = User
    #     fields =  ['username','password']
    # password = serializers.CharField(
    #     max_length=128,
    #     min_length=8,
    #     write_only=True
    # )
    # token = serializers.CharField(max_length=255, read_only=True)

    # class Meta:
    #     model = User
    #     # List all of the fields that could possibly be included in a request
    #     # or response, including fields specified explicitly above.
    #     fields = ['username', 'password']

    # def create(self, validated_data):
    #     # Use the `create_user` method we wrote earlier to create a new user.
    #     return User.objects.create_user(**validated_data)