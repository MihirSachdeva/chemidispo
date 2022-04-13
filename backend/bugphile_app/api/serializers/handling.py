from rest_framework import serializers
from bugphile_app.models import Handling

class HandlingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Handling
        fields = '__all__'
