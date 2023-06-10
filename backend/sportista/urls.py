from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', views.index, name='index'),
    path('get_sport_halls_by_user/<int:user_id>/', views.get_sport_halls_by_user, name='get_sport_halls_by_user'),
    path('delete_sport_hall/<int:sport_hall_id>/', views.delete_sport_hall, name='delete_sport_hall'),
    path('get_sport_names/', views.get_sport_names, name='get_sport_names'),
    path('add_sport_hall/', views.add_sport_hall, name='add_sport_hall'),
]