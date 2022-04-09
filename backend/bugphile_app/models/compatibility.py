from django.db import models
from .category import Category
from ckeditor.fields import RichTextField
from bugphile_app.managers import CompatibilityManager


class Compatibility(models.Model):
    category_1 = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="compatibility_1")
    category_2 = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="compatibility_2")
    report = RichTextField()
    objects = CompatibilityManager()

    class Meta:
        unique_together = ['category_1', 'category_2']
