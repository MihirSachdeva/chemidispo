from rest_framework import viewsets
from bugphile_app.models import Handling
from bugphile_app.api.serializers import HandlingSerializer


class HandlingViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Handlings.
    """
    queryset = Handling.objects.all()
    serializer_class = HandlingSerializer