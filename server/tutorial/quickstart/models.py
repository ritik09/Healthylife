from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


# Create your models here.
class User(AbstractUser):
    username=models.CharField(max_length=200,unique=True)
    email=models.EmailField(max_length=200,unique=True,help_text='Required')
    first_name=models.CharField(max_length=200)
    last_name=models.CharField(max_length=200)
    phone_number=models.CharField(max_length=12,validators=[MinLengthValidator(9)])
    password=models.CharField(validators=[RegexValidator(regex='^.{6}$', message='Length has to be 6', code='nomatch')],max_length=50) 

class Meta:
    verbose_name =('user')
    verbose_name_plural = ('users')
    # abstract=True

    def _str_(self):
        return self.username