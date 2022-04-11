from rest_framework import viewsets
from bugphile_app.models import Category
from bugphile_app.api.serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing category.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer