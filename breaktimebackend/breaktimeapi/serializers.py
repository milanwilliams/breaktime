from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Timesheet
# , CustomUser


class TimesheetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Timesheet
        fields = ('name', 'type', 'manager',
                  'funding', 'date', 'time_from', 'time_to')


# class CustomUserSerializer(serializers.ModelSerializer):
#     """
#     Currently unused in preference of the below.
#     """
#     email = serializers.EmailField(
#         required=True
#     )
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(
#         min_length=8, write_only=True, required=True)

#     class Meta:
#         model = CustomUser
#         fields = ('email', 'username', 'password')
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         # as long as the fields are the same, we can just use this
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance


# class ApiTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         # token = super().get_token(user)
#         token = super(ApiTokenObtainPairSerializer, cls).get_token(user)

#         token['employee_name'] = user.employee_name
#         return token
