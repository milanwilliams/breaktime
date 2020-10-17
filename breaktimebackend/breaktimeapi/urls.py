from django.urls import include, path, re_path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'shifts', views.ShiftViewSet)
# router.register(r'locations/<int:organization>', views.LocationList)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls))
]
