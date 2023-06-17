from datetime import datetime 
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
from django.core import serializers




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
    email = request.data.get('email')
    phone_number = request.data.get('phone_number')
    sports = request.data.get('sports', [])
    photo = request.data.get('photo')
    owner_id = request.data.get('owner')
    try:
        owner = User.objects.get(id=owner_id)
    except User.DoesNotExist:
        return Response({'message': 'Invalid owner ID'}, status=status.HTTP_400_BAD_REQUEST)

    sport_hall = SportsHall(
        name=name,
        address=address,
        city=city,
        email=email,
        phone_number=phone_number,
        owner= owner, 
        photo=photo,
    )
    print(sport_hall)
    sport_hall.save()
    sport_hall.sports.set(sports)
    sport_hall.save()
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
def get_all_sports_halls(request):
    sport_halls = SportsHall.objects.all()
    serializer = SportsHallSerializer(sport_halls, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_sport_hall_by_id(request, sport_hall_id):
    try:
        sport_hall = SportsHall.objects.get(id=sport_hall_id)
        serializer = SportsHallSerializer(sport_hall)
        return Response(serializer.data)
    except SportsHall.DoesNotExist:
        return Response(status=404)

@api_view(['GET'])
def get_appointments_by_sport_hall(request, sport_hall_id):
    try:
        appointments = Appointment.objects.filter(sport_hall_id=sport_hall_id)
        serializer = AppointmentSerializer(appointments, many=True)  
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
    appointment_id = request.data.get('appointment_id')
    username = request.data.get('username')
    id_sender = request.data.get('id')
        
    try:
        sender = User.objects.get(id=id_sender)
        receiver = User.objects.get(username=username)
        appointment = UserAppointment.objects.get(id=appointment_id)

        invite = Invites(sender=sender, receiver=receiver, appointment=appointment)
        invite.save()
            
        serializer = InvitesSerializer(invite)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except UserAppointment.DoesNotExist:
        return Response({"error": "Appointment does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
            user_appointments = UserAppointment.objects.filter(appointment=appointment)
            available_spots = appointment.capacity - sum(user_appointment.used_spots for user_appointment in user_appointments)

            appointment_data.append({
                'id': appointment.id,
                'sport_hall': appointment.sport_hall.name,
                'sports': [sport.sport_name for sport in appointment.sports.all()],
                'date': appointment.date,
                'time_start': appointment.time_start,
                'time_end': appointment.time_end,
                'capacity': appointment.capacity,
                'price': appointment.price,
                'available': appointment.available and available_spots > 0
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
    
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    filename = f'{timestamp}_{file.name}'

    # Handle file upload and save it in the default storage location
    # Assuming your ImageField is defined as `photo = models.ImageField(upload_to='media/images')`
    # You can use the same upload_to value to save the uploaded photo

    # Save the uploaded photo and get its path
    photo_path = f'media/images/{filename}'
    with open(photo_path, 'wb') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    # Return the path to the uploaded photo
    return Response({'path': photo_path}, status=200)


@api_view(['GET'])
def get_all_sport_halls(request):
    sportshalls = SportsHall.objects.all()
    data = serializers.serialize('json', sportshalls)
    return HttpResponse(data, content_type='application/json')




@api_view(['GET'])
def invites_sent_by_me(request):
    user = request.user
    sent_invites = Invites.objects.filter(sender=user)

    serialized_invites = []
    for invite in sent_invites:
        serialized_invite = {
            'id': invite.id,
            'receiver': {
                'user_name': invite.receiver.user_name,
            },
            'appointment': {
                'sport_hall': {
                    'name': invite.appointment.sport_hall.name,

                },
                'time': invite.appointment.time,
            },
            'status': invite.status,
        }
        serialized_invites.append(serialized_invite)

    return JsonResponse(serialized_invites, safe=False)


@api_view(['GET'])
def invites_received_by_me(request):
    user = request.user
    received_invites = Invites.objects.filter(receiver=user)

    serialized_invites = []
    for invite in received_invites:
        serialized_invite = {
            'id': invite.id,
            'sender': {
                'user_username': invite.sender.user_username,
            },
            'appointment': {
                'sport_hall': {
                    'name': invite.appointment.sport_hall.name,
                },
                'time': invite.appointment.time,
            },
            'status': invite.status,
        }
        serialized_invites.append(serialized_invite)

    return JsonResponse(serialized_invites, safe=False)

@api_view(['PATCH'])
def accept_invite(request, invite_id):
    try:
        invite = Invites.objects.get(id=invite_id)
        invite.status = 1
        invite.save()
        return Response(status=status.HTTP_200_OK)
    except Invites.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def update_user_appointment(request, invite_id):
    try:
        appointment_id = request.data.get('appointmentId')
        user_id = request.data.get('userId')

        appointment = UserAppointment.objects.get(appointment_id=appointment_id)
        appointment.users.add(user_id)
        appointment.used_spots += 1
        appointment.save()

        return Response(status=status.HTTP_200_OK)
    except (UserAppointment.DoesNotExist, KeyError):
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def decline_invite(request, invite_id):
    try:
        invite = Invites.objects.get(id=invite_id)
        invite.status = 2
        invite.save()
        return Response(status=status.HTTP_200_OK)
    except Invites.DoesNotExist:
        return Response({'error': 'Invite not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def add_user_appointment(request):
    appointment_id = request.data.get('appointment')
    users = request.data.get('users')
    used_spots = request.data.get('used_spots')
    available_spots = request.data.get('available_spots')
    sport_id = request.data.get('sport')
    available = request.data.get('available')

    # Create the UserAppointment object and save it to the database
    user_appointment = UserAppointment(
        appointment=appointment_id,
        used_spots=used_spots,
        available_spots=available_spots,
        sport=sport_id,
        available=available
    )
    user_appointment.save()
    user_appointment.users.set(users)

    # Return a response indicating successful creation
    return Response({'message': 'UserAppointment created successfully'}, status=201)
