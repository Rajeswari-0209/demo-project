from rest_framework import serializers
from .models import Tweet


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['id','name','body','image','like_count','created_at','updated_at']
