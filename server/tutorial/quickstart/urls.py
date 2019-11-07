from django.urls import path
from .views import SignUp,validateotp,resendotp,Enquiry,MessageView,DoctorView
from django.conf.urls import url
from . import views
app_name = 'quickstart'

urlpatterns = [
    path('signup/', SignUp.as_view()),
    path('doctors/', DoctorView.as_view()),
    path('enquiry/', Enquiry.as_view()),
    path('message/', MessageView.as_view()),
    url(r'^resendotp/(?P<user_id>[0-9]+)/$',resendotp.as_view(), name='resend-otp'),
   
    path('', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room')
]