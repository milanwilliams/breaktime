from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics

from .serializers import ShiftSerializer
from .models import Shift
# from rest_framework import status, permissions

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ApiTokenObtainPairSerializer


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer


class ObtainTokenPairWithEmployeeView(TokenObtainPairView):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = ApiTokenObtainPairSerializer
