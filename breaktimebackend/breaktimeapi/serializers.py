from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Shift


class ShiftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Shift
        fields = ('name', 'type', 'manager',
                  'funding')


class ApiTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # token = super().get_token(user)
        token = super(ApiTokenObtainPairSerializer, cls).get_token(user)

        token['employee_name'] = user.employee_name
        return token
