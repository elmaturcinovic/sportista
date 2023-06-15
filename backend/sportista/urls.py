from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', views.index, name='index'),
    path('get_sport_halls_by_user/<int:user_id>/', views.get_sport_halls_by_user, name='get_sport_halls_by_user'),
    path('delete_sport_hall/<int:sport_hall_id>/', views.delete_sport_hall, name='delete_sport_hall'),
    path('password_reset/', views.password_reset, name="password_reset"),
    path('get_sport_names/', views.get_sport_names, name="get_sport_names"),
    path('get_sports/', views.get_sports, name="get_sports"),
    path('get_sport_cities/', views.get_sport_cities, name="get_sport_cities"),
    path('update_profile/', views.update_profile, name="update_profile"),
    path('add_sport_hall/', views.add_sport_hall, name="add_sport_hall"),
    path('get_sport_hall_by_id/<int:sport_hall_id>/', views.get_sport_hall_by_id, name="get_sport_hall_by_id"),
    path('get_sport_names_selected/', views.get_sport_names_selected, name="get_sport_names"),
    path('get_day_names_selected/', views.get_day_names_selected, name="get_day_names"),
    path('update_sport_hall/<int:sport_hall_id>', views.update_sport_hall, name="update_sport_hall"),
    path('get_days/', views.get_days, name="get_days"),
    path('get_all_appointments_by_owner/<int:owner_id>/', views.get_all_appointments_by_owner, name='get_all_appointments_by_owner'),    
    path('add_new_appointment/', views.add_new_appointment, name="add_new_appointment"),
    path('delete_appointment/<int:appointment_id>/', views.delete_appointment, name='delete_appointment'),
    path('get_user/<int:user_id>/', views.get_user, name="get_user"),
    path('upload_photo/', views.upload_photo, name='upload_photo'),




    path('invite_friend/', views.invite_friend, name="invite_friend"),
    path('get_user_appointments_by_user/<int:user_id>/', views.get_user_appointments_by_user, name="get_user_appointments_by_user"),
    path('delete_user_appointment/<int:user_id>/', views.delete_user_appointment, name="delete_user_appointment"),
]