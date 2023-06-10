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
from rest_framework import status




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
        u = User(user_username=username, user_name=firstName, user_lastname=lastName, user_type=userType, user_email=email, user_password=password)
        #print(username + " " + email)
        u.save()
        return HttpResponse("1")


@api_view(['GET'])
def get_sport_halls_by_user(request, user_id):
    try:
        sport_halls = SportsHall.objects.filter(owner_id=user_id)
        serializer = SportsHallSerializer(sport_halls, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except SportsHall.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def register_sport_hall(request):
    serializer = SportsHallSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_sport_hall(request, sport_hall_id):
    try:
        sport_hall = SportsHall.objects.get(id=sport_hall_id)
        sport_hall.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except SportsHall.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_all_users (request):
    try:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except SportsHall.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def password_reset(request):
    try:
        user_id = request.data.get('id')
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    new_password = request.data.get('newpass')
    user.user_password = new_password
    user.save()
    return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)

# Za uzimanje interesa i smestanje u dropdown
# ali ovo je probno, treba da se uzme od usera sportovi.
@api_view(['GET'])
def get_all_sport_interests (request):
    sports = Sport.objects.all()
    serializer = SportSerializer(sports, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

#za sliku
@api_view(['PUT'])
def update_profile_image(request):
    if request.method == 'PUT':
        user = request.user
        profile_image = request.FILES.get('profileImage')

        if profile_image:
            user.user_photo = profile_image
            user.save()

            return JsonResponse({'message': 'Profilna slika uspješno promijenjena!'})
        else:
            return JsonResponse({'error': 'Slika nije selektovana'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
