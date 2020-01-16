from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _
# Register your models here.
from .models import User
from .models import PhoneOtp,Enquiry,Message,Doctor,Appointment,ReplyEnquiry,Specialization,City,Category

@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password',)}),
        (_('Personal info'), {'fields': ('name','hospital_name','image','street_name','specialization',)}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions',)}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined',)}),)

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password','password2',),}),)

    list_display = ('email', 'name', 'is_staff',)
    search_fields = ('email', 'name',)
    ordering = ('email',)

admin.site.register(Specialization)
admin.site.register(City)
admin.site.register(PhoneOtp)
admin.site.register(Category)
# admin.site.register(Enquiry)
# admin.site.register(Message)
# admin.site.register(Doctor)
# admin.site.register(ReplyEnquiry)