from rest_framework import serializers
from widget.models import DataFiles


class DataFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataFiles
        fields = ['id', 'widget', 'files']
