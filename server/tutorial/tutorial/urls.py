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

from django.contrib import admin
from django.urls import include,path
from rest_framework import routers
from quickstart import views
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_simplejwt import views as jwt_views
from quickstart.views import LoginView
# from quickstart.views import CustomAuthToken
# from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
# router.register(r'login', views.LoginViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    # url(r'^api-token-auth/', views.obtain_auth_token),
    path('quickstart/', include('quickstart.urls')), 
    path('', include(router.urls)),
    # url(r'^login/', LoginView.as_view()),
    # url(r'^usertoken/', usertoken.as_view()),
    path('token-auth/', obtain_jwt_token),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
