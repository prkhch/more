from .views import ChangePasswordView
from django.urls import path, include
from . import views

urlpatterns = [
    path('profile/<str:username>/', views.profile),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
]