from django.db import models

from utils.mixins import UUID


def file_upload_path(instance, filename):
    return f"data/files/{instance.id}/{filename}"


class DataFiles(UUID):
    files = models.FileField(upload_to=file_upload_path)
    widget = models.ForeignKey("widget.Widget", on_delete=models.CASCADE)
