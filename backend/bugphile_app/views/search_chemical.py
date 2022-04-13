from django.db.models import Q
from rest_framework.views import APIView
from bugphile_app.models import Chemical
from bugphile_app.api.serializers import ChemicalSerializer
from bugphile_app.pagination import CustomPagination


class SearchChemicalView(APIView, CustomPagination):

    page_size = 10

    def get(self, request):
        chemical = self.request.GET.get('chemical', None)

        query_1 = Q(name__icontains=chemical)
        query_2 = Q(cas_number__icontains=chemical)

        query = query_1 | query_2

        if chemical is not None:
            chemicals = Chemical.objects.filter(query)
        else:
            chemicals = Chemical.objects.none()

        results = self.paginate_queryset(chemicals, request, view=self)
        serializer = ChemicalSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
