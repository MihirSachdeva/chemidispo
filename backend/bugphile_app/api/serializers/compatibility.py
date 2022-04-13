import ast
from rest_framework import serializers
from bugphile_app.models import Compatibility
from bugphile_app.api.serializers import CategorySerializer


class CompatibilitySerializer(serializers.ModelSerializer):
    category_1 = CategorySerializer()
    category_2 = CategorySerializer()
    report = serializers.SerializerMethodField()

    def get_report(self, obj):
        compatibilities = ast.literal_eval(obj.report)
        return compatibilities

    class Meta:
        model = Compatibility
        fields = '__all__'
