from django.db import models

# Create your models here.
from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.
class Tweet(models.Model):
    # name=models.CharField(max_length=40)
    # body=models.CharField(max_length=500)
    
    name = models.CharField(
        'Name', max_length=14, db_index=True, default='Anonymous'
    )
    body = models.CharField(
        'Body',  max_length=140, db_index=True , default=''
    )
    # image = CloudinaryField(
    #     'image', blank=True, null=True 
    # )
    image = models.CharField(
        'image', max_length=1000, db_index=True, default='Anonymous'
    )
    like_count = models.PositiveIntegerField(
        'Like Count', default=0, blank=True
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=True, auto_now=True
    )
    updated_at = models.DateTimeField(
        'Updated Datetime', blank=True, auto_now=True
    )
   
