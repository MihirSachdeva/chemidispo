from django.db import models


class Placard(models.Model):
    description = models.CharField(max_length=100)
    link = models.TextField()
