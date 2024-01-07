from django.shortcuts import render

from backend.settings import MEDIA_ROOT, BASE_DIR

import torch
from torch import nn
from torch.nn import functional as F
import torchvision
# Create your views here.

from .serializer import ImagesSerializer 
from .generator_model import AttU_Net, conv_block, up_conv, Attention_block, Recurrent_block, RRCNN_block, single_conv 

# import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.models import User
from .models import Images
from rest_framework.parsers import MultiPartParser, FormParser
import os
import __main__
setattr(__main__, "AttU_Net", AttU_Net)
setattr(__main__, "up_conv", up_conv)
setattr(__main__, "Attention_block", Attention_block)
setattr(__main__, "Recurrent_block", Recurrent_block)
setattr(__main__, "RRCNN_block", RRCNN_block)
setattr(__main__, "single_conv", single_conv)
setattr(__main__, "conv_block", conv_block)

mlmodel = AttU_Net()
PATH = os.path.join(BASE_DIR, 'imageAPI', 'generator30.pt')
mlmodel = torch.load(PATH, map_location=torch.device('cpu'))

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
            print("image is ",  MEDIA_ROOT + serializer.data['clothImage'])



            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # get the user 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        # delete all images
        # delete all image of tihs user
        Images.objects.filter(user=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




