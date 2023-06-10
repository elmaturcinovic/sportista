from django.db import models

# Create your models here.

class Sport(models.Model):
    sport_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.sport_name

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
    user_photo = models.ImageField(upload_to='media/images', default='/images/avatar.png')

    def __str__(self):
        return self.user_username

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


    def __str__(self):
        return self.name

class SportsHallSportInterest(models.Model):
    sports_hall = models.ForeignKey(SportsHall, on_delete=models.CASCADE)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.user_username} - {self.sport.sport_name}'


class Appointment(models.Model):
    sport_hall = models.ForeignKey(SportsHall, on_delete=models.CASCADE)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    capacity = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"Appointment at {self.sport_hall} for {self.sport} on {self.date} at {self.time}"

class UserAppointment(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    available_spots = models.IntegerField()
    used_spots = models.IntegerField(default=0)
    available = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if self.available_spots is None:
            self.available_spots = self.appointment.capacity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Appointment at {self.appointment.sport_hall} for {self.user} for {self.used_spots}/{self.appointment.capacity} people"

class Rating(models.Model):
    sport_hall = models.ForeignKey(SportsHall, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()

    def __str__(self):
        return f"Rating {self.rating} for {self.sport_hall} by {self.user}"
    
