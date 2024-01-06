from django.shortcuts import render

# Create your views here.


# import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.models import User


class imageEndPoint(APIView):
    def get(self, request, pk):
        return Response({"message": "IMAGE Hello, world!"})

    def post(self, request, pk):
        return Response({"message": "IMAGE Got some data!", "data": request.data})



