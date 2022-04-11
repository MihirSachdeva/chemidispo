from django.db import models
from bugphile_app.models import Chemical
from ckeditor.fields import RichTextField


class Handling(models.Model):
    chemical = models.OneToOneField(Chemical, on_delete=models.CASCADE, related_name="handling")
    msds = RichTextField()
