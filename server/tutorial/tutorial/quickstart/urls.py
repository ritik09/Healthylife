from django.urls import path
from .views import SignUp,validateotp,resendotp
from django.conf.urls import url
app_name = 'quickstart'

urlpatterns = [
    path('signup/', SignUp.as_view()),
     url(r'^resendotp/(?P<user_id>[0-9]+)/$',resendotp.as_view(), name='resend-otp'),
    url(r'^validateotp/(?P<user_id>[0-9]+)/$', validateotp.as_view(), name='validateotp'),
]