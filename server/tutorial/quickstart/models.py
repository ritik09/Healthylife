from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser,BaseUserManager
import uuid
from django.utils.translation import ugettext_lazy as _
from django.core.validators import RegexValidator
from django.utils import timezone
from multiselectfield import MultiSelectField
from django.utils.encoding import python_2_unicode_compatible

def nameFile(instance, filename):
    return '/'.join(['images', str(instance.name), filename])

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)

class Specialization(models.Model):
    type=models.CharField(max_length=100,null=True)
    def __str__(self):
        return self.type

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    hospital_name = models.CharField(max_length=100,null=True)
    name=models.CharField(max_length=200,null=True)
    # last_name=models.CharField(max_length=200)
    password=models.CharField(validators=[RegexValidator(regex='^.{6}$', message='Length has to be 6', code='nomatch')],max_length=50) 
    confirm_password=models.CharField(validators=[RegexValidator(regex='^.{6}$', message='Length has to be 6', code='nomatch')],max_length=50,null=True)
    image =models.ImageField(upload_to='pics',null='True')
    street_name = models.CharField(max_length=100,null=True)
    specialization = models.ManyToManyField(Specialization,related_name="specialist")
    objects = UserManager()

class Meta:
    verbose_name =('user')
    verbose_name_plural = ('users')
    # abstract=True

    # def _str_(self):
    #     return self.username

class PhoneOtp(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,null=True)
    otp = models.IntegerField(null=False,blank=False)
    sent_on= models.DateTimeField(auto_now_add=True,null=True)

class Doctor(models.Model):
    first_name = models.CharField(max_length=100,null=True)
    last_name = models.CharField(max_length=100,null=True)
    Qualification = models.CharField(max_length=100)
    Years_of_Experience = models.IntegerField()
    # category=[
    #     ('Cardio','Cardiologists'),
    #     ('Derma','Dermatalogist'),
    #     ('Immuno','Immunologists'),
    #     ('Endocrin','Endocrinologists'),
    #     ('Neuro','Neurologist'),
    #     ('Path','Pathologist'),
    #     ('Psych','Psychiatrists')
    # ]
    Specialization = models.CharField(max_length=100,)
    Contact = models.IntegerField()
    image = models.ImageField(upload_to='pics',null='True')
    hospital = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

class Rating(models.Model):
    user = models.ForeignKey(Doctor,on_delete=models.CASCADE)
    star = models.IntegerField()
    

class Enquiry(models.Model):
    # username = models.CharField(max_length=100)
    contact=models.CharField(max_length=10,null=True)
    Query = models.TextField(max_length=300)
    hospital_name = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

class ReplyEnquiry(models.Model):
    enquiry=models.CharField(max_length=500,null=True)
    reply = models.CharField(max_length=500)
    # username = models.CharField(max_length=100,null=True)
    hospital_name = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

class Message(models.Model):
    author = models.ForeignKey(User,related_name='author_messages',on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    reciever = models.ForeignKey(User,on_delete=models.CASCADE,null=True)

    # def __str__(self):
    #     return self.author.username

    def last_30_messages(self):
        return Message.objects.order_by('-timestamp').all()[:30]

class Appointment(models.Model):
    # username = models.CharField(max_length=100)
    contact = models.CharField(max_length=15)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100,null=True)
    hospital_name = models.ForeignKey(User,on_delete=models.CASCADE)

class AppointmentType(models.Model):
    Accepted = models.BooleanField(default=False)
    Rejected = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)






    