from django.urls import path
from .views import SignUp,validateotp,resendotp,Enquiry,MessageView,Sign_Up_Hospital,DoctorView,HospitalProfile,HospitalViewSet,AppointmentView,Make_Appointment
from django.conf.urls import url
from . import views
app_name = 'quickstart'

urlpatterns = [
    path('signup_as_user/', SignUp.as_view()),
    path('signup_as_hospital/', Sign_Up_Hospital.as_view()),
    # path('hospitals/', Hospital.as_view()),
    path('enquiry/', Enquiry.as_view()),
    url(r'^make_appointment/(?P<user_id>[0-9]+)/$', Make_Appointment.as_view()),
    url(r'^appointment/(?P<user_id>[0-9]+)/$', AppointmentView.as_view()),
    url(r'^hospital_profile/(?P<user_id>[0-9]+)/$',HospitalProfile.as_view(), name='hospital_profile'),
    url(r'^hospital/(?P<user_id>[0-9]+)/$',DoctorView.as_view(),name='hospital'),
    path('message/', MessageView.as_view()),
    url(r'^resendotp/(?P<user_id>[0-9]+)/$',resendotp.as_view(), name='resend-otp'),
    path('', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room')
]