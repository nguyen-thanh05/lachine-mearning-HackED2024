from django.db import models

# Create your models here.



def cloth_upload_to(instance, filename):
    return 'cloth/{filename}'.format(filename=filename)

def person_upload_to(instance, filename):
    return 'person/{filename}'.format(filename=filename)

def cloth_person_upload_to(instance, filename):
    return 'cloth_person/{filename}'.format(filename=filename)

class Images(models.Model):
    clothImage = models.ImageField(upload_to=cloth_upload_to, null=True, blank=True)
    personImage = models.ImageField(upload_to=person_upload_to, null=True, blank=True)
    clothPersonImage = models.ImageField(upload_to=cloth_person_upload_to, null=True, blank=True)

    user = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True, blank=True)
# description field where default is set to "no description"
    description = models.CharField(max_length=100, default="no description")
