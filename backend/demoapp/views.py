from django.shortcuts import render
from rest_framework import viewsets
from demoapp.serializers import TweetSerializer
from .models import Tweet

class TweetViewSet(viewsets.ModelViewSet):
    # queryset = Tweet.objects.all().order_by()
    queryset = Tweet.objects.order_by('created_at').reverse().all()[:20]
    serializer_class = TweetSerializer
   
Tweet.objects.order_by('created_at').reverse().all()[:20]
