from rest_framework import serializers

from widget.models import Data, DataFiles


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['id', 'widget', 'data_json']
        extra_kwargs = {
            "widget": {"read_only": True}
        }

    def create(self, validated_data):
        widget_id = self.context["widget_id"]
        return Data.objects.create(
            widget_id=widget_id, **validated_data
        )

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if "attachments" in instance.data_json:
            new_json = instance.data_json
            for x, y in new_json.items():
                if x == "attachments":
                    from widget.serializers import DataFileSerializer
                    data_files = DataFileSerializer(
                        instance=DataFiles.objects.get(id=y),
                        context=self.context
                    ).data
                    new_json[x] = data_files
            representation['data_json'] = new_json
        return representation
