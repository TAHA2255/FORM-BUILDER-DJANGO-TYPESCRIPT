import uuid

from django.db import models
from django.utils.timesince import timesince


class UUID(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def created(self):
        return timesince(self.created_at)

    def updated(self):
        return timesince(self.updated_at)
