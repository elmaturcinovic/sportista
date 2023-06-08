from django.db import models

# Create your models here.

class Sport(models.Model):
    sport_name = models.CharField(max_length=255)

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
    user_sport = models.ForeignKey(Sport, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.user_username


class SportsHall(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    sports = models.ManyToManyField(Sport)
    photo = models.ImageField(upload_to='media/images', default='')

    def __str__(self):
        return self.name



class Appointment(models.Model):
    sport_hall = models.ForeignKey(SportsHall, on_delete=models.CASCADE)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"Appointment at {self.sport_hall} for {self.sport} on {self.date} at {self.time}"



class Rating(models.Model):
    sport_hall = models.ForeignKey(SportsHall, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()

    def __str__(self):
        return f"Rating {self.rating} for {self.sport_hall} by {self.user}"