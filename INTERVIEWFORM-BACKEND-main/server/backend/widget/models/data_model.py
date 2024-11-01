from django.db import models

from utils.mixins import UUID


class Data(UUID):
    widget = models.ForeignKey("widget.Widget", on_delete=models.CASCADE)
    data_json = models.JSONField()
