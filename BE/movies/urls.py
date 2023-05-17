from django.urls import path, include
from . import views

urlpatterns = [
    path('<int:movie_pk>/', views.movie_comment),
]