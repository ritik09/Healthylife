from django.urls import path
from .views import SignUp
from django.conf.urls import url
app_name = 'quickstart'

urlpatterns = [
    # path('current_user/', current_user),
    #url(r'^validate/', validateotp.as_view()),
    path('signup/', SignUp.as_view()),
]