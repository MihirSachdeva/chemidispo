from rest_framework import viewsets
from bugphile_app.models import Chemical
from bugphile_app.api.serializers import ChemicalSerializer


class ChemicalViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing chemicals.
    """
    queryset = Chemical.objects.all()
    serializer_class = ChemicalSerializer