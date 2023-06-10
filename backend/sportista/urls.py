from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('login', views.index, name='index'),
    path('get_sport_halls_by_user/<int:user_id>/', views.get_sport_halls_by_user, name='get_sport_halls_by_user'),
    path('delete_sport_hall/<int:sport_hall_id>/', views.delete_sport_hall, name='delete_sport_hall'),
    path('sporthalls/<int:owner_id>/', views.sport_halls_by_owner, name='sporthalls-by-owner')
    path('password_reset/', views.password_reset, name="password_reset"),
    path('get_sport_names/', views.get_sport_names, name="get_sport_names"),
    path('update_profile/', views.update_profile, name="update_profile"),
]