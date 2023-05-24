from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    profile_image = models.ImageField(upload_to='profile_images/',blank=True, null=True, default='profile_images/f960dd5c12548f12c0a01fa56c42be25.jpg')