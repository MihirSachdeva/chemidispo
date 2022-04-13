from django.db import models
from bugphile_app.models import Category
from bugphile_app.models import Placard


class Chemical(models.Model):
    category = models.ManyToManyField(Category, related_name="chemicals")
    placard = models.ManyToManyField(Placard, related_name="chemicals")
    name = models.TextField()
    cas_number = models.TextField()
    description = models.TextField()
    chemical_formula = models.TextField()

    def __str__(self):
        categories = self.category.all()
        categories_str = ''
        for category in categories:
            categories_str += str(category.code) + '. ' + category.name + ' | '
        return f"Chemical: {self.id}. {self.name}; Categories: {categories_str}"
