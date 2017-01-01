from rest_framework import viewsets
from bears.models import Bear
from utils.bears.serializers import BearSerializer, AllBearsSerializer


# ViewSets define the view behavior.
class AllBearsViewSet(viewsets.ModelViewSet):
    queryset = Bear.objects.all()
    serializer_class = AllBearsSerializer


class BearViewSet(viewsets.ModelViewSet):
    queryset = Bear.objects.all()
    serializer_class = BearSerializer