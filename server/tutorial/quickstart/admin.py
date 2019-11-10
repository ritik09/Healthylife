from django.contrib import admin

# Register your models here.
from .models import User
from .models import PhoneOtp,Enquiry,Message,Doctor,Appointment
admin.site.register(User)
admin.site.register(PhoneOtp)
admin.site.register(Appointment)
admin.site.register(Enquiry)
admin.site.register(Message)
admin.site.register(Doctor)