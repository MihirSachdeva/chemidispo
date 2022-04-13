from django.db import models
from .category import Category
from bugphile_app.managers import CompatibilityManager


class Compatibility(models.Model):
    category_1 = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="compatibility_1")
    category_2 = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="compatibility_2")
    report = models.TextField()
    objects = CompatibilityManager()

    class Meta:
        unique_together = ['category_1', 'category_2']

    def __str__(self):
        return f"Compatibility: {self.category_1.name} ({self.category_1.code}) & {self.category_2.name} ({self.category_2.code})"
