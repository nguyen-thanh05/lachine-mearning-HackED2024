from django.shortcuts import render

from backend.settings import MEDIA_ROOT, BASE_DIR

import torch
from torch import nn
from torch.nn import functional as F
import torchvision
import numpy as np
from torchvision.utils import save_image

from django.core.files import File  # you need this somewhere
import urllib
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
import cv2
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

outputImgPath = os.path.join(MEDIA_ROOT, 'output')


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

            clothImageUrl = MEDIA_ROOT[:-6] + serializer.data['clothImage']
            personImageUrl = MEDIA_ROOT[: -6] + serializer.data['personImage']
            
            cloth_tensor = torchvision.io.read_image(clothImageUrl).float() / 255
            person_tensor = torchvision.io.read_image(personImageUrl).float() / 255

            
            normalization = torchvision.transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])

            cloth_tensor = normalization(cloth_tensor)
            person_tensor = normalization(person_tensor)

            bothinput = torch.cat((cloth_tensor, person_tensor), 0).unsqueeze(0)

            test = mlmodel(bothinput)
            
            output = torchvision.utils.make_grid(test, padding=2, normalize=True)
            image_name = outputImgPath +  "/output" + str(serializer.data['id']) + ".png"
            print("serizlier id",   serializer.data['id'])
            print("output path", outputImgPath) 
            #cv2.imwrite(image_name, np.transpose(output, (1,2,0)))
            save_image(output, image_name)
            
            newmodel = Images(clothImage=serializer.data['clothImage'], personImage=serializer.data['personImage'], clothPersonImage=File(open(image_name, 'rb')), user=userObj)

            serializer = ImagesSerializer(newmodel)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # get the user 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        # delete all images
        # delete all image of tihs user
        Images.objects.filter(user=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




