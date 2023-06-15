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
def get_sport_names(request):
    sports = Sport.objects.values_list('sport_name', flat=True)
    sport_names = list(sports)
    return JsonResponse({'sport_names': sport_names})

@api_view(['GET'])
def get_sports(request):
    try:
        sports = Sport.objects.all()
        serializer = SportSerializer(sports, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Sport.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_sport_cities(request):
    cities = SportsHall.objects.values_list('city', flat=True).distinct()
    sport_cities = list(cities)
    return JsonResponse({'sport_cities': sport_cities})

@api_view(['POST'])
def add_sport_hall(request):
    name = request.data.get('name')
    address = request.data.get('address')
    city = request.data.get('city')
    sport_names = request.data.getlist('sports')
    photo = request.data.get('photo')
    owner_id = request.data.get('owner')
    try:
        owner = User.objects.get(id=owner_id)
    except User.DoesNotExist:
        return Response({'message': 'Invalid owner ID'}, status=status.HTTP_400_BAD_REQUEST)
    
    sports = Sport.objects.filter(sport_name__in=sport_names)


    sport_hall = SportsHall(
        name=name,
        address=address,
        city=city,
        owner= owner, 
        photo=photo,      
    )
    print(sport_hall)
    sport_hall.save()
    sport_hall.sports.set(sports)

    return Response({'message': 'Sport hall created', 'id' : sport_hall.id}, status=status.HTTP_201_CREATED)


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

@api_view(['PUT'])
def update_profile(request):
    try:
        file_obj = request.FILES.get('profileImage')
        user_id = request.data.get('id')

        user = request.user
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.user_photo = file_obj
    user.save()

    return Response({'message': 'Profile image successfully changed'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_sport_hall_by_id(request, sport_hall_id):
    try:
        sport_hall = SportsHall.objects.get(id=sport_hall_id)
        serializer = SportsHallSerializer(sport_hall)
        return Response(serializer.data)
    except SportsHall.DoesNotExist:
        return Response(status=404)
    
@api_view(['GET'])
def get_day_names_selected(request):
    day_ids = request.GET.getlist('dayIds[]')  
    day_names = Day.objects.filter(id__in=day_ids).values_list('name', flat=True)
    print(day_names)
    return Response(day_names)

@api_view(['GET'])
def get_sport_names_selected(request):
    sport_ids = request.GET.getlist('sportIds[]')
    sport_names = Sport.objects.filter(id__in=sport_ids).values_list('sport_name', flat=True)
    print(sport_names)
    return Response(sport_names)

@api_view(['PUT'])
def update_sport_hall(request, sport_hall_id):
    try:
        sport_hall = SportsHall.objects.get(id=sport_hall_id)
        sport_hall.sports.set(request.data.get('sports', []))
        sport_hall.work_time_begin = request.data.get('work_time_begin')
        sport_hall.work_time_end =request.data.get('work_time_end')
        sport_hall.working_days.set(request.data.get('working_days', []))
        if (sport_hall.photo != request.data.get('photo')):
            sport_hall.photo = request.data.get('photo')
        print(request.data.get('photo'))
        
        sport_hall.save()
        return Response({'message': 'Sport hall updated successfully'})
    except SportsHall.DoesNotExist:
        return Response({'error': 'Sport hall not found'}, status=404)
    
@api_view(['PUT'])
def update_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.user_photo = request.data.get('user_photo')
        
        user.save()
        return Response({'message': 'User updated successfully'})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(['GET'])
def get_days(request):
    try:
        days = Day.objects.all().order_by("id")
        serializer = DaySerializer(days, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Sport.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def invite_friend(request):
    email = request.data.get('email')
    exists = User.objects.filter(user_email=email).exists()

    print(exists)

    if (exists):
        subject = 'Pozivnica'
        message = 'Pozvan si na sportski termin!'
        recipient_list = [email]
        send_mail(subject, message, None, recipient_list)
        return JsonResponse({'message': 'Pozivnica uspesno poslana!'})
    else:
        return JsonResponse({'error': 'Nema korisnika sa ovom e-mail adresom.'}, status=405)
    

@api_view(['GET'])
def get_user_appointments_by_user(request, user_id):
    try:
        sport_appointments = UserAppointment.objects.filter(id=user_id)
        serializer = UserAppointmentSerializer(sport_appointments, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except SportsHall.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_user_appointment(request, sport_appointment_id):
    try:
        sport_appointment = UserAppointment.objects.get(id=sport_appointment_id)
        sport_appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except SportsHall.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
def get_all_appointments_by_owner(request, owner_id):
    try:
        sport_halls = SportsHall.objects.filter(owner_id=owner_id)
        sport_hall_ids = sport_halls.values_list('id', flat=True)
        print(sport_hall_ids)
        
        appointments = Appointment.objects.filter(sport_hall_id__in=sport_hall_ids)
        appointment_data = []

        for appointment in appointments:
            appointment_data.append({
                'id': appointment.id,
                'sport_hall': appointment.sport_hall.name,
                'sports': [sport.sport_name for sport in appointment.sports.all()],
                'date': appointment.date,
                'time_start': appointment.time_start,
                'time_end': appointment.time_end,
                'capacity': appointment.capacity
            })

        return Response(appointment_data)

    except SportsHall.DoesNotExist:
        return Response({'error': 'Owner does not exist'}, status=404)


@api_view(['POST'])
def add_new_appointment(request):
    print(request.data)
    serializer = AppointmentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_appointment(request, appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id)
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except SportsHall.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response(status=404)
    

@api_view(['POST'])
def upload_photo(request):
    file = request.FILES.get('photo')

    if file is None:
        return Response({'error': 'No photo found in the request'}, status=400)

    # Handle file upload and save it in the default storage location
    # Assuming your ImageField is defined as `photo = models.ImageField(upload_to='media/images')`
    # You can use the same upload_to value to save the uploaded photo

    # Save the uploaded photo and get its path
    photo_path = 'images/' + file.name
    with open('media/' + photo_path, 'wb') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    # Return the path to the uploaded photo
    return Response({'path': photo_path}, status=200)