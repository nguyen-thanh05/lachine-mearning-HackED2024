from django.shortcuts import render


# Create your views here.

from .serializer import ImagesSerializer 

# import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.models import User
from .models import Images
from rest_framework.parsers import MultiPartParser, FormParser


class imageEndPoint(APIView):
    serializer_class = ImagesSerializer
    parser_classes = (MultiPartParser, FormParser)
    def get(self, request, pk):
        images = Images.objects.filter(user=pk)
        serializer = ImagesSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        # upload an image

        print(request.data)
        serializer = ImagesSerializer(data=request.data)
        if serializer.is_valid():
            userObj = User.objects.get(id=pk)
            serializer.save(user=userObj)
            # to do 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # get the user 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        # delete all images
        # delete all image of tihs user
        Images.objects.filter(user=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




