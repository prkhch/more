from django.urls import path, include
from . import views

urlpatterns = [
    # 영화 상세 페이지
    path('movies/<int:movie_pk>/', views.movie_detail),
    # 댓글 삭제 및 수정
    path('comments/<int:comment_pk>/<str:username>/', views.comment_detail),
    # 댓글 추가
    path('movies/<int:movie_pk>/comment/<str:username>/', views.comment_create),
    # 좋아요
    path('movies/<int:movie_pk>/like/<str:username>/', views.movie_like),
    # 좋아요 갯수
    path('movies/<int:movie_pk>/likecount/', views.movie_like_count),
    # 나중에 볼 동영상 추가 및 삭제
    path('movies/<int:movie_pk>/watchlater/<str:username>/', views.modify_watch_later),
    # 나중에 볼 동영상 가져오기
    path('movies/watchlater/<str:username>/', views.get_watch_later),
    # 팔로우
    path('profile/<str:profilename>/<str:username>/', views.follow),
]