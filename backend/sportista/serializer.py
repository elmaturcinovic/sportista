from .models import *
from rest_framework.serializers import ModelSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SportsHallSerializer(ModelSerializer):
    class Meta:
        model = SportsHall
        fields = '__all__' 

class UserAppointmentSerializer(ModelSerializer):
    class Meta:
        model = UserAppointment
        fields = '__all___'
