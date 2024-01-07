
from user.serializer import UserSerializer
from .models import Images
from rest_framework import serializers


class ImagesSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    class Meta:
        model = Images
        fields = ('clothImage', 'personImage', 'clothPersonImage', 'description', 'user')


