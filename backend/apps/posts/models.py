from django.db import models

from core.models import BaseModel


class Post(BaseModel):
    title = models.CharField(max_length=256, blank=True)
    body = models.TextField()

    def __str__(self):
        return self.title
