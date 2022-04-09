from rest_framework import serializers
from bugphile_app.models import Handling
from bugphile_app.api.serializers import ChemicalSerializer

class HandlingSerializer(serializers.ModelSerializer):
    chemical = ChemicalSerializer()

    class Meta:
        model = Handling
        fields = '__all__'
