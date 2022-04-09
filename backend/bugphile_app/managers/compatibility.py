from django.db import models
from django.db.models import Q


class CompatibilityQuerySet(models.QuerySet):
    def filter_by_categories(self, categories, *args, **kwargs):
        category_12 = Q(
            category_1=categories[0],
            category_2=categories[1],
        )
        category_21 = Q(
            category_1=categories[1],
            category_2=categories[0],
        )
        category = category_12 | category_21
        return self.filter(category, *args, **kwargs)


class CompatibilityManager(models.Manager):
    queryset_class = CompatibilityQuerySet

    def get_compatibility(self, categories, *args, **kwargs):
        return self.get_queryset().filter_by_categories(categories, *args, **kwargs)
