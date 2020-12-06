from django.urls import include, path, re_path
from rest_framework import routers
from django.contrib import admin
from rest_framework_simplejwt import views as jwt_views
from . import views

router = routers.DefaultRouter()
router.register(r'shifts', views.TimesheetViewSet)
# router.register(r'locations/<int:organization>', views.LocationList)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('user/create/', views.CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', views.ObtainTokenPairWithEmployeeView.as_view(),
         # path('token/obtain/', jwt_views.TokenObtainPairView.as_view(),
         name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', views.HelloWorldView.as_view(), name='hello_world')
]
