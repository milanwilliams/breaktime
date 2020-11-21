from rest_framework import serializers

from .models import Shift


class ShiftSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Shift
        fields = ('name', 'type', 'manager',
                  'funding')
