from rest_framework import viewsets, status
from rest_framework.response import Response
from bugphile_app.models import Chemical
from bugphile_app.api.serializers import ChemicalDetailSerializer


class ChemicalViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing chemicals.
    """
    queryset = Chemical.objects.all()
    serializer_class = ChemicalDetailSerializer

    def list(self, request):
        return Response(
            'Chemical id not provided.',
            status=status.HTTP_400_BAD_REQUEST
        )
