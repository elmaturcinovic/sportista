from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
import json
from . models import *
from . serializer import *
from django.core.mail import send_mail
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from rest_framework.response import Response




@api_view(['POST'])
def index(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(username + " " + password)
    rez = User.objects.get(user_username = username, user_password = password)
    try:
        user = User.objects.get(user_username=username, user_password=password)
        serializer = UserSerializer(user)
        print(serializer.data)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({'error': 'User not found'}, status=404)

@api_view(['POST'])
def emailReset(request):

    email = request.data.get('email')
    print(email)

    exists = User.objects.filter(user_email=email).exists()

    print(exists)

    if (exists):
        new_password = 'sifrica123'
        send_mail('Nova sifra', new_password, None, [email], fail_silently=False)
        return HttpResponse('1')
    else:
        return HttpResponse('-1')

@api_view(['POST'])
def register(request):
    firstName = request.data.get('name')
    lastName = request.data.get('lastName')
    userType = request.data.get('userType')
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(user_username=username).exists() or User.objects.filter(user_email=email).exists() :
        #print(username + " " + email)
        return HttpResponse("-1")
    else:
        u = User(user_username=username, user_name=firstName, user_lastname=lastName, user_email=email, user_password=password)
        #print(username + " " + email)
        u.save()
        return HttpResponse("1")
