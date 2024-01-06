
from .models import Images
from rest_framework import serializers


class ImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Images
        fields = ('clothImage', 'personImage', 'clothPersonImage', 'description')


