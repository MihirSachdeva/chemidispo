from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from bugphile_app.models import Issue

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    text = RichTextField()
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return f"{self.text} | Issue:{self.issue.title} | Commenter:{self.commenter.name}"
