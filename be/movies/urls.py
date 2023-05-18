from django.urls import path, include
from . import views

urlpatterns = [
    path('<int:movie_pk>/', views.movie_detail),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('<int:movie_pk>/comment/', views.comment_create)
]