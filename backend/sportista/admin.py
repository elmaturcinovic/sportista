from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Sport)
admin.site.register(Appointment)
admin.site.register(SportsHall)
admin.site.register(Rating)
admin.site.register(Day)
admin.site.register(UserAppointment)