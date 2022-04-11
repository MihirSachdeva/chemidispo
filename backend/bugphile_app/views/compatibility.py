from rest_framework import viewsets
from bugphile_app.models import Compatibility
from bugphile_app.api.serializers import CompatibilitySerializer


class CompatibilityViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Compatibilitys.
    """
    queryset = Compatibility.objects.all()
    serializer_class = CompatibilitySerializer