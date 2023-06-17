from django.db import models

# Create your models here.

class Sport(models.Model):
    sport_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.sport_name

def get_default_user_photo():
    return 'media/images/avatar.png'

def get_default_sport_hall_photo():
    return 'media/images/sport_hall.png'

class User(models.Model):
    USER_TYPE_CHOICES = (
        (0, 'User'),
        (1, 'Sport Hall Owner'),
    )

    user_name = models.CharField(max_length=30)
    user_lastname = models.CharField(max_length=30)
    user_type = models.IntegerField(choices=USER_TYPE_CHOICES, default=0)
    user_username = models.CharField(max_length=40)
    user_password = models.CharField(max_length=40)
    user_email = models.CharField(max_length=50)
    user_photo = models.ImageField(upload_to='media/images')

    def __str__(self):
        return self.user_username
    
    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        if not self.user_photo:
            if self.user_type == 0:
                self.user_photo = get_default_user_photo()
            elif self.user_type == 1:
                self.user_photo = get_default_sport_hall_photo()



class Day(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class SportsHall(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    sports = models.ManyToManyField(Sport, blank=True)
    photo = models.ImageField(upload_to='media/images', default='')
    work_time_begin = models.TimeField(null=True, blank=True)
    work_time_end = models.TimeField(null=True, blank=True)
    working_days = models.ManyToManyField(Day, blank=True)
    email = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)


    def __str__(self):
        return self.name

class SportsHallSportInterest(models.Model):
    sports_hall = models.ForeignKey(SportsHall, on_delete=models.CASCADE)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.user_username} - {self.sport.sport_name}'


class Appointment(models.Model):
    sport_hall = models.ForeignKey(SportsHall, on_delete=models.CASCADE)
    sports = models.ManyToManyField(Sport, blank=True)
    date = models.DateField()
    time_start = models.TimeField()
    time_end = models.TimeField()
    capacity = models.IntegerField(null=True, blank=True)
    price = models.FloatField(default=0) 

    def __str__(self):
        return f"Appointment at {self.sport_hall} for {self.sports} on {self.date} at {self.time_start}. Price: {self.price}"

class UserAppointment(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    users = models.ManyToManyField(User)
    available_spots = models.IntegerField()
    used_spots = models.IntegerField(default=0)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    available = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if self.available_spots is None:
            self.available_spots = self.appointment.capacity
        super().save(*args, **kwargs)

    def __str__(self):
        if (self.users):
            user = self.users.first()
        else:
            user = None
        return f"Appointment at {self.appointment.sport_hall} for {user} for {self.used_spots}/{self.appointment.capacity} people"

class Rating(models.Model):
    sport_hall = models.ForeignKey(SportsHall, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()

    def __str__(self):
        return f"Rating {self.rating} for {self.sport_hall} by {self.user}"
    
class Invites(models.Model):
    STATUS_CHOICES = (
        (0, 'Sent'),
        (1, 'Accepted'),
        (2, 'Rejected')
    )
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_invites')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_invites')
    appointment = models.ForeignKey(UserAppointment, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)
    
    def __str__(self):
        return f"Invite from {self.sender.user_username} to {self.receiver.user_name} for appointment at {self.appointment.appointment.sport_hall.name}: {self.status}"