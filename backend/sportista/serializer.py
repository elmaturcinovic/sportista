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

class SportSerializer(ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__' 

class DaySerializer(ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__' 

class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class UserAppointmentSerializer(ModelSerializer):
    class Meta:
        model = UserAppointment
        fields = '__all___'
