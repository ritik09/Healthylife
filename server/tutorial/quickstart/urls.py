from django.urls import path
from .views import SignUp,validateotp,resendotp,Enquiry
from django.conf.urls import url
from . import views
app_name = 'quickstart'

urlpatterns = [
    path('signup/', SignUp.as_view()),
    path('enquiry/', Enquiry.as_view()),
    url(r'^resendotp/(?P<user_id>[0-9]+)/$',resendotp.as_view(), name='resend-otp'),
    url(r'^validateotp/(?P<user_id>[0-9]+)/$', validateotp.as_view(), name='validateotp'),
    path('', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room')
]