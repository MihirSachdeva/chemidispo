import json, ast
from rest_framework import serializers
from bugphile_app.models import Chemical
from bugphile_app.api.serializers import (
    CategorySerializer,
    PlacardSerializer
)


class ChemicalSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)

    class Meta:
        model = Chemical
        fields = '__all__'


class ChemicalDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)
    placard = PlacardSerializer(many=True)
    handling = serializers.SerializerMethodField()
    cas_number = serializers.SerializerMethodField()

    def get_handling(self, obj):
        msds = json.loads(obj.handling.msds)
        return msds

    def get_cas_number(self, obj):
        cas_number_list = ast.literal_eval(obj.cas_number)
        return cas_number_list

    class Meta:
        model = Chemical
        fields = '__all__'
