from django.contrib import admin

# Register your models here.
from .models import User
from .models import PhoneOtp,Hospital_Name,Enquiry,Message
admin.site.register(User)
admin.site.register(PhoneOtp)
admin.site.register(Hospital_Name)
admin.site.register(Enquiry)
admin.site.register(Message)