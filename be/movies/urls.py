from django.urls import path, include
from . import views

urlpatterns = [
    path('movies/<int:movie_pk>/', views.movie_detail), # 영화 상세 페이지
    path('comments/<int:comment_pk>/<str:username>/', views.comment_detail), # 댓글 삭제 및 수정
    path('movies/<int:movie_pk>/comment/<str:username>/', views.comment_create), # 댓글 추가
    path('movies/<int:movie_pk>/like/<str:username>/', views.movie_like),
]