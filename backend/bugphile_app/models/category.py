from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=512)
    code = models.IntegerField()

    def __str__(self):
        return f"Category: {self.id}. {self.name}; Code: {self.code}"
