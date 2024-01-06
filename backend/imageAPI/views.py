from django.shortcuts import render


# Create your views here.

from .serializer import ImagesSerializer 

# import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.models import User
from rest_framework.parsers import MultiPartParser, FormParser


class imageEndPoint(APIView):
    serializer_class = ImagesSerializer
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request, pk):
        return Response({"message": "IMAGE Hello, world!"})

    def post(self, request, pk):
        # upload an image

        print(request.data)
        serializer = ImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # to do 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # get the user 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        # delete all images
        User.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




