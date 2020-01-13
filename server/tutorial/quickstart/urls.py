from django.urls import path
from .views import SignUp,validateotp,resendotp,MessageView,Sign_Up_Hospital,DoctorView,ReplyEnquiryView,HospitalProfile,DeleteEnquiry,Hospital_Name,doctor,DeleteDoctors,HospitalViewSet,HospitalDoctor,AppointmentView,Hospital_Profile,HospitalRating,Make_Appointment, AppointmentProfileView,Make_Enquiry,EnquiryView,Patient_EnquiryView,UserProfileChangeAPIView,UserProfileChangeHospitalAPIView,Category
from django.conf.urls import url
from . import views
app_name = 'quickstart'

urlpatterns = [
    path('signup_as_user/', SignUp.as_view()),
    path('signup_as_hospital/', Sign_Up_Hospital.as_view()),
    # path('hospitals/', Hospital.as_view()),
    path('make_appointment/', Make_Appointment.as_view()),
    url(r'^appointment_view/(?P<user_id>[0-9]+)/(?P<status>[A-za-z]+)/$', AppointmentProfileView.as_view()),
    url(r'^appointment/(?P<user_id>[0-9]+)/$', AppointmentView.as_view()),
    url('make_enquiry/', Make_Enquiry.as_view()),
    url('EnquiryView/', EnquiryView.as_view()),
    url(r'^reply_enquiry/(?P<id>[0-9]+)/$', ReplyEnquiryView.as_view()),
    url('patient_enquiryview/', Patient_EnquiryView.as_view()),
    # url(r'^Patient_AppointmentView/(?P<user_id>[0-9]+)/$', EnquiryView.as_view()),
    url(r'^hospital_profile/',HospitalProfile.as_view(), name='hospital_profile'),
    url(r'^hospital_doctor/(?P<user_id>[0-9]+)/$',HospitalDoctor.as_view(), name='hospital_profile'),
    url(r'^hospital/',DoctorView.as_view(),name='hospital'),
    path('message/', MessageView.as_view()),
    url(r'^resendotp/(?P<user_id>[0-9]+)/$',resendotp.as_view(), name='resend-otp'),
    path('', views.index, name='index'),
    url(r'^profile_user/(?P<username>[\w.@+-]+)/$', UserProfileChangeAPIView.as_view(), name='changeProfile'),
    url(r'^profile_hospital/(?P<username>[\w.@+-]+)/$', UserProfileChangeHospitalAPIView.as_view(), name='changeProfile'),
    url(r'^hospital_rating/(?P<user_id>[0-9]+)/$', HospitalRating.as_view()),
    url(r'^hospital_detail/(?P<username>[\w.@+-]+)/$', Hospital_Profile.as_view()),
    url(r'^hospital_detail/(?P<username>[\w.@+-]+)/$', Hospital_Profile.as_view()),
    url(r'^doctor/(?P<doctor_id>[0-9]+)/$', doctor.as_view()),
    url(r'^hospital_name/(?P<user_id>[0-9]+)/$', Hospital_Name.as_view()),
    url(r'^delete/(?P<pk>\d+)',DeleteDoctors.as_view(), name='delete'),
    url(r'^delete_enquiry/(?P<pk>\d+)',DeleteEnquiry.as_view(), name='delete'),
    url(r'^category/(?P<type_id>[0-9]+)/$',Category.as_view(), name='category'),
    path('<str:room_name>/', views.room, name='room')
]