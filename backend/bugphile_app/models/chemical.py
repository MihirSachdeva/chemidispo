from django.db import models
from bugphile_app.models import Category


class Chemical(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="chemical")
    name = models.CharField(max_length=100)
    cas_number = models.CharField(max_length=100)
