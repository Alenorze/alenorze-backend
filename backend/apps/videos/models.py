from django.db import models

from core.models import BaseModel


class Video(BaseModel):
    title = models.CharField(max_length=256, default="No title")
    url = models.URLField(max_length=512)

    def __str__(self) -> str:
        return self.title
