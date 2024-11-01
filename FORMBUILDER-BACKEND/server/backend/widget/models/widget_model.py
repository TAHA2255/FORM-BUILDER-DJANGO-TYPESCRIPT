import os

from django.db import models

from utils.mixins import UUID


class Widget(UUID):
    html = models.TextField()
    css = models.TextField(default="")
    form_name = models.TextField(default='form_name')
    selection = models.TextField(default='database')
    

    def __str__(self):
        return self.form_name
    



    def generate_embedcode(self):
        html = f"<div class='clicflo_{self.id}'></div>"
        html += f"<script src='{os.getenv('FRONTEND_URL')}static/js/embedHtml.js'></script>"  # noqa
        return html
