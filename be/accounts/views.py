from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import User
from .serializers import UserSerializer, ModifyProfileSerializer, ChangePasswordSerializer

# Create your views here.
@api_view(['GET', 'PUT'])
def profile(request, username):
    person = User.objects.get(username=username)
    if request.method == 'GET':
        serializer = UserSerializer(person)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = ModifyProfileSerializer(person, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            data={'result':'잘못된 입력'}
            return Response(data, status=status.HTTP_406_NOT_ACCEPTABLE)

class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer