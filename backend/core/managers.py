from django.db import models
from django.db.models.query import QuerySet


class BaseQuerySet(QuerySet):
    """Base query set"""
    def active(self):
        return self.filter(is_active=True)


class BaseManager(models.Manager):
    """Base Manager"""
    def all(self):
        return self.get_queryset()
