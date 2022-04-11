from rest_framework import serializers
from bugphile_app.models import Chemical
from bugphile_app.api.serializers import CategorySerializer

class ChemicalSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Chemical
        fields = '__all__'
