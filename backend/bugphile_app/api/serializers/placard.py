
from rest_framework import serializers
from bugphile_app.models import Placard


class PlacardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Placard
        fields = '__all__'
