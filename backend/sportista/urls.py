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
    path('get_all_sports_halls/', views.get_all_sports_halls, name="get_all_sports_halls"),
    path('get_sport_hall_by_id/<int:sport_hall_id>/', views.get_sport_hall_by_id, name="get_sport_hall_by_id"),
    path('get_appointments_by_sport_hall/<int:sport_hall_id>/', views.get_appointments_by_sport_hall, name="get_appointments_by_sport_hall"),
    path('get_sport_names_selected/', views.get_sport_names_selected, name="get_sport_names"),
    path('get_day_names_selected/', views.get_day_names_selected, name="get_day_names"),
    path('update_sport_hall/<int:sport_hall_id>', views.update_sport_hall, name="update_sport_hall"),
    path('get_days/', views.get_days, name="get_days"),
    path('get_all_appointments_by_owner/<int:owner_id>/', views.get_all_appointments_by_owner, name='get_all_appointments_by_owner'),    
    path('add_new_appointment/', views.add_new_appointment, name="add_new_appointment"),
    path('delete_appointment/<int:appointment_id>/', views.delete_appointment, name='delete_appointment'),
    path('get_user/<int:user_id>/', views.get_user, name="get_user"),
    path('upload_photo/', views.upload_photo, name='upload_photo'),
    path('update_user/<int:user_id>', views.update_user, name="update_user"),
    path('invite_friend/', views.invite_friend, name="invite_friend"),
    path('get_user_appointments_by_user/<int:user_id>/', views.get_user_appointments_by_user, name="get_user_appointments_by_user"),
    path('delete_user_appointment/', views.delete_user_appointment, name="delete_user_appointment"), 
    path('get_all_sport_halls/', views.get_all_sport_halls, name="get_all_sport_halls"),
    
    path('invites_sent_by_me/<int:user_id>/', views.invites_sent_by_me, name="invites_sent_by_me"),
    path('invites_received_by_me/<int:user_id>/', views.invites_received_by_me, name="invites_received_by_me"),
    path('accept_invite/<int:invite_id>/', views.accept_invite, name='accept_invite'),
    path('update_user_appointment/', views.update_user_appointment, name='update_user_appointment'),
    path('decline_invite/<int:invite_id>/', views.decline_invite, name='decline_invite'),
    
    path('add_user_appointment/', views.add_user_appointment, name="add_user_appointment"),
    path('join_user_appointment/<int:user_appointment_id>/', views.join_user_appointment, name='join_user_appointment'),
    path('get_all_users/', views.get_all_users, name="get_all_users"),
    path('get_user_appointments_by_appointments/', views.get_user_appointments_by_appointments, name='get_user_appointments_by_appointments'),
    path('get_appointment_by_id/<int:appointment_id>', views.get_appointment_by_id, name='get_appointment_by_id'),

    path('get_user_appointment_by_user_appointment_id/<int:user_appointment_id>/', views.get_user_appointment_by_appointment_id, name="get_user_appointment_by_appointment_id"),

]