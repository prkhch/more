from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from .serializers.movie import MovieSerializer
from .serializers.comment import CommentSerializer, CommetListSerializer, CommentCreateSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Movie, Comment
from accounts.models import User
from django.http import JsonResponse


@api_view(['GET'])
# @permission_classes(['IsAuthenticated'])
def movie_detail(request, movie_pk):
    if request.method == 'GET':
        try:
            movie = get_object_or_404(Movie, pk=movie_pk)
        except:
            movie_data = {
                'id':movie_pk
            }
            movieserializer = MovieSerializer(data=movie_data)
            if movieserializer.is_valid(raise_exception=True):
                movieserializer.save()
                movie = get_object_or_404(Movie, pk=movie_pk)
        try:
            comment = Comment.objects.filter(movie = movie_pk)
            serializer = CommetListSerializer(comment, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            data = {
                'comment' : '등록된 댓글이 없습니다.'
            }
            return Response(data, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
# @permission_classes(['IsAuthenticated'])
def comment_create(request, movie_pk, username):
    movie = get_object_or_404(Movie, pk=movie_pk)
    userid = User.objects.get(username=username)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie_id=movie.pk, user_id=userid.id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(3)


@api_view(['PUT', 'DELETE'])
# @permission_classes(['IsAuthenticated'])
def comment_detail(request, comment_pk, username):
    comment = get_object_or_404(Comment, pk=comment_pk)
    userid = User.objects.get(username=username)
    if request.method == 'PUT':
        # if request.user == comment.user:
            serializer = CommentCreateSerializer(comment, data=request.data)
            print(serializer)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        # else:
        #     data = {
        #         'update':False,
        #         'description': '로그인한 유저가 작성한 글이 아닙니다.'
        #     }    
        #     return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    elif request.method == 'DELETE':
        if userid.id == comment.user_id:
            comment.delete()
            data = {
                'delete': f'comment {comment_pk} is deleted'
            }
            return Response(data, status=status.HTTP_204_NO_CONTENT)
        else:
            data = {
                'delete':False,
                'description': '로그인한 유저가 작성한 글이 아닙니다.'
            }    
            return Response(data, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def movie_like(request, movie_pk, username):
    response = {'islike':''}
    userid = User.objects.get(username=username)
    if request.method == 'POST':
        movie = get_object_or_404(Movie, pk=movie_pk)
        existed = movie.like.filter(pk=userid.id).exists()
        if existed:
            movie.like.remove(userid.id)
            response['islike'] = 'dislike'
        else:
            movie.like.add(userid.id)
            response['islike'] = 'like'
        return Response(response, status=status.HTTP_200_OK)
    else:
        return Response(response, status=status.HTTP_403_FORBIDDEN)