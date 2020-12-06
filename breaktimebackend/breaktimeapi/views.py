from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics

# from .serializers import ShiftSerializer
from .serializers import TimesheetSerializer
# from .models import Shift
from .models import Timesheet
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ApiTokenObtainPairSerializer, CustomUserSerializer


class TimesheetViewSet(viewsets.ModelViewSet):
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer

    def get_queryset(self):
        queryset = self.queryset

        from_date = self.request.query_params.get('from', None)
        # this needs to be here if you're doing an if statement checking if none or not; otherwise default is something vs NOne
        to_date = self.request.query_params.get('to', None)
        if from_date is not None and to_date is not None:
            queryset = queryset.filter(date__range=(from_date, to_date))
        print("queryset", queryset)
        return queryset


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
