from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics

from .serializers import ShiftSerializer
from .models import Timesheet
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ApiTokenObtainPairSerializer, CustomUserSerializer, TimesheetSerializer


class TimesheetViewSet(viewsets.ModelViewSet):
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer


class ObtainTokenPairWithEmployeeView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ApiTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello": "world"}, status=status.HTTP_200_OK)
