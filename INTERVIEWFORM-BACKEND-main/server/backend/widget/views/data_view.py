from rest_framework import generics

from widget.serializers import DataSerializer
from widget.models import Data


class DataListAPIView(generics.ListAPIView):
    serializer_class = DataSerializer

    def get_queryset(self):
        return Data.objects.filter(
            widget_id=self.kwargs.get("widget_id")
        )


class DataCreateAPIView(generics.CreateAPIView):
    serializer_class = DataSerializer
    queryset = Data.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["widget_id"] = self.kwargs.get("widget_id")
        return context
