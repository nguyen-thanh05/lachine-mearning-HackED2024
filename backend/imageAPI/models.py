from django.db import models

# Create your models here.

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


def cloth_upload_to(instance, filename):
    return 'cloth/{filename}'.format(filename=filename)

def person_upload_to(instance, filename):
    return 'person/{filename}'.format(filename=filename)

def cloth_person_upload_to(instance, filename):
    return 'cloth_person/{filename}'.format(filename=filename)

class Images(models.Model):
    clothImage = models.ImageField(upload_to=upload_to, null=True, blank=True)
    personImage = models.ImageField(upload_to=upload_to, null=True, blank=True)
    clothPersonImage = models.ImageField(upload_to=upload_to, null=True, blank=True)

    descriptin = models.CharField(max_length=100)  # name of hte 
