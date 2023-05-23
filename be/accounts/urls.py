from .views import ChangePasswordView
from django.urls import path
from . import views

urlpatterns = [
    path('profiles/<str:username>/', views.profile, name='profile'),
    path('profiles/<str:username>/change-password/', ChangePasswordView.as_view(), name='change_password'),
]