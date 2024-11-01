from rest_framework import serializers
from widget.models import Data
from widget.models import Widget


class WidgetSerializer(serializers.ModelSerializer):
    embed_code = serializers.SerializerMethodField()

    class Meta:
        model = Widget
        fields = ["id", "html", "css", "form_name", "created", "updated","embed_code","selection"]

    # def get_fields(self):
    #     fields = super().get_fields()
    #     method = self.context.get("method")
    #     if method == "generate_embedcode":
    #         fields.update({
    #             "html": serializers.CharField(source="generate_embedcode")
    #         })
    #     return fields
    def get_embed_code(self, obj):
        return obj.generate_embedcode()
