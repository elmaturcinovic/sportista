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
