from django.db.models import Q
from rest_framework.views import APIView
from bugphile_app.models import Chemical
from bugphile_app.api.serializers import ChemicalSerializer
from bugphile_app.pagination import CustomPagination


class SearchChemicalWithCategoryView(APIView, CustomPagination):

    page_size = 10

    def get(self, request):
        chemical = self.request.GET.get('chemical', None)

        query_1 = Q(name__icontains=chemical)
        query_2 = Q(cas_number__icontains=chemical)
        query_3 = Q(category__isnull=False)

        query = (query_1 | query_2) & query_3

        if chemical is not None:
            chemicals = Chemical.objects.filter(query)
        else:
            chemicals = Chemical.objects.none()

        results = self.paginate_queryset(chemicals, request, view=self)
        serializer = ChemicalSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
