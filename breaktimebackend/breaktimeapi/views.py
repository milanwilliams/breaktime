from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics

from .serializers import ShiftSerializer
from .models import Shift


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
