from django.db import models
from django.conf import settings

# Create your models here.
class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_movies')

class Comment(models.Model):
    content = models.CharField(max_length=100)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class WatchLater(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.IntegerField()