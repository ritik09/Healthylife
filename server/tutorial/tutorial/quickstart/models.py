from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class User(AbstractUser):

    username=models.CharField(max_length=200,unique=True)
    email=models.EmailField(max_length=200,unique=True,help_text='Required')
    first_name=models.CharField(max_length=200)
    last_name=models.CharField(max_length=200)
    password=models.CharField(validators=[RegexValidator(regex='^.{6}$', message='Length has to be 6', code='nomatch')],max_length=50) 
    confirm_password=models.CharField(validators=[RegexValidator(regex='^.{6}$', message='Length has to be 6', code='nomatch')],max_length=50,null=True)

class Meta:
    verbose_name =('user')
    verbose_name_plural = ('users')
    # abstract=True

    def _str_(self):
        return self.username

class PhoneOtp(models.Model):
    receiver = models.OneToOneField(User, on_delete=models.CASCADE,null=True)
    otp = models.IntegerField(null=False,blank=False)
    sent_on= models.DateTimeField(auto_now_add=True,null=True)

class Hospital_Name(models.Model):
    hospital_name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='pics',null='True')
    street_name = models.CharField(max_length=100,null='True')
    def __str__(self):
        return self.hospital_name
    
class DoctorProfile(models.Model):
    Full_name = models.CharField(max_length=100,null=True)
    Hospital = models.ForeignKey(Hospital_Name,on_delete=models.CASCADE,null=True)
    Degree = models.CharField(max_length=100)
    Years_of_Experience = models.IntegerField()
    category=[
        ('Cardio','Cardiologists'),
        ('Derma','Dermatalogist'),
        ('Immuno','Immunologists'),
        ('Endocrin','Endocrinologists'),
        ('Neuro','Neurologist'),
        ('Path','Pathologist'),
        ('Psych','Psychiatrists')
    ]
    Specialization = models.CharField(max_length=100,choices=category)
    Contact = models.IntegerField()
    image = models.ImageField(upload_to='pics',null='True')

class Rating(models.Model):
    user = models.ForeignKey(DoctorProfile,on_delete=models.CASCADE)
    star = models.IntegerField()

    def __str__(self):
        return "%s rated %s"%(self.user.username,self.product.name)
