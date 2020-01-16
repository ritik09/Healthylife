"""tutorial URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import include,path
from rest_framework import routers
from quickstart import views
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt import views as jwt_views
from quickstart.views import SignUp,validateotp,resendotp,MessageView,HospitalViewSet,DoctorView,HospitalProfile,SpecializationViewSet,CityViewSet
from django.contrib.auth.views import LoginView
from django_otp.forms import OTPAuthenticationForm
# from quickstart.views import CustomAuthToken
# from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet),
router.register(r'hospitals',views.HospitalViewSet,basename='hospitals'),
router.register(r'specialization',views.SpecializationViewSet,basename='specialization'),
router.register(r'city',views.CityViewSet,basename='city'),
default_router = DefaultRouter(trailing_slash=False)


# router.register(r'login', views.LoginViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('quickstart/',include('quickstart.urls')), 
    url(r'^validateotp/(?P<user_id>[0-9]+)/$', validateotp.as_view(), name='validateotp'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('',include(default_router.urls)),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
