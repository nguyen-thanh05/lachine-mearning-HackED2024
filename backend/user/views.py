from django.shortcuts import render

#import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
# Create your views here.
from .serializer import UserSerializer
from rest_framework import status

class userView(APIView):
    def get(self, request, pk):
        return Response({"message": "USER Hello, world!"})

    def post(self, request, pk):
        return Response({"message": "USER Got some data!", "data": request.data})


class usersView(APIView):
    serializer_class = UserSerializer
    def get(self, request):
        # return all users
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # create a new user
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        # delete all users
        User.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
