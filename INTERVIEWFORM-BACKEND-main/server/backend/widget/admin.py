from django.contrib import admin
from widget.models import Widget, Data, DataFiles


# Register your models here.
admin.site.register(Widget)
admin.site.register(Data)
admin.site.register(DataFiles)
