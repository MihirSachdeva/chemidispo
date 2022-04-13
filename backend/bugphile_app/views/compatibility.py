from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from bugphile_app.models import Chemical, Compatibility
from bugphile_app.api.serializers import CompatibilitySerializer
from bugphile_app.constants.compatibilities import compatibility_map


class CompatibilityView(APIView):

    def get(self, request):
        chemical_1_id = self.request.GET.get('chemical_1', None)
        chemical_2_id = self.request.GET.get('chemical_2', None)

        try:
            chemical_1 = Chemical.objects.get(id=chemical_1_id)
            chemical_2 = Chemical.objects.get(id=chemical_2_id)
        except:
            return Response(
                {'message': 'Could not find the chemicals you searched for.'},
                status=status.HTTP_404_NOT_FOUND
            )

        categories_1 = chemical_1.category.all()
        categories_2 = chemical_2.category.all()

        query_1 = Q(
            category_1__in=categories_1,
            category_2__in=categories_2,
        )
        query_2 = Q(
            category_1__in=categories_2,
            category_2__in=categories_1,
        )

        query = query_1 | query_2

        compatibilities = Compatibility.objects.filter(query)

        serializer = CompatibilitySerializer(compatibilities, many=True)

        reports = []
        final_compatibility_report = []

        for compatibility in serializer.data:
            reports.extend(compatibility['report'])

        reports = set(reports)

        for report in reports:
            compatibility_data = compatibility_map[report]
            final_compatibility_report.append({
                "name": compatibility_data["name"],
                "description": compatibility_data["description"],
            })

        return Response(
            final_compatibility_report,
            status=status.HTTP_200_OK
        )
