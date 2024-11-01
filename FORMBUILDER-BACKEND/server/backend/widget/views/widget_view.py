from rest_framework import generics

from widget.serializers import WidgetSerializer
from widget.models import Widget



class WidgetRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = WidgetSerializer
    queryset = Widget.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["method"] = "generate_embedcode"
        return context


class WidgetHtmlRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = WidgetSerializer
    queryset = Widget.objects.all()


class WidgetListAPIView(generics.ListAPIView):
    serializer_class = WidgetSerializer
    queryset = Widget.objects.all()


class WidgetCreateAPIView(generics.CreateAPIView):
    serializer_class = WidgetSerializer
    queryset = Widget.objects.all()

    def create(self, request, *args, **kwargs):
        # Create the widget using the serializer
        response = super().create(request, *args, **kwargs)
        
        # Retrieve the created widget instance using the id from the response data
        widget_id = response.data['id']
        widget = Widget.objects.get(pk=widget_id)
        
        # Generate the embed code
        embed_code = widget.generate_embedcode()
        
        # Update the response data with the embed code
        response.data.update({"embed_code": embed_code})
        
        return response


class WidgetUpdateAPIView(generics.UpdateAPIView):
    serializer_class = WidgetSerializer
    queryset = Widget.objects.all()


class WidgetDeleteAPIView(generics.DestroyAPIView):
    serializer_class = WidgetSerializer
    queryset = Widget.objects.all()
