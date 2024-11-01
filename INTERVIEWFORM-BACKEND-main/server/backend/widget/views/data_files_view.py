from rest_framework import generics, parsers

from widget.serializers import DataFileSerializer
from widget.models import DataFiles


class DataFileCreateAPIView(generics.CreateAPIView):
    serializer_class = DataFileSerializer
    queryset = DataFiles.objects.all()
