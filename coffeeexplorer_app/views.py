from .models import *
from rest_framework import permissions, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import *

class CityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows cities to be viewed or edited.
    """
    queryset = Cities.objects.all().order_by('name')
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]

class MetroStationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows metro stations to be viewed or edited.
    """
    queryset = MetroStations.objects.all().order_by('name')
    serializer_class = MetroStationSerializer
    permission_classes = [permissions.AllowAny]


class AddressViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows addresses to be viewed or edited.
    """
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.AllowAny]


class EstablishmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows establishments to be viewed or edited.
    """
    queryset = Establishments.objects.all().order_by('name')
    serializer_class = EstablishmentSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.AllowAny]


class WorkingHoursViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows working hours to be viewed or edited.
    """
    queryset = WorkingHours.objects.all()
    serializer_class = WorkingHoursSerializer
    permission_classes = [permissions.AllowAny]