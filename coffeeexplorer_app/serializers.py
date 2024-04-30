from rest_framework import serializers
from .models import *

class CitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cities
        fields = ["cityID", "name"]


class MetroStationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MetroStations
        fields = ["msID", "name", "city", "longitude", "latitude"]


class AddressSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Address
        fields = ["addressID", "city", "metro_station", "street", "building", "longitude", "latitude"]


class EstablishmentSerializer(serializers.HyperlinkedModelSerializer):
    address = AddressSerializer(read_only=True)
    picture = serializers.ImageField(required=True)
    class Meta:
        model = Establishments
        fields = ["establishmentID", "name", "address", "description", "picture", "avg_bill", "veg_positions", "alt_brewing", "alt_milk", "pets", "food", "non_coffee_drink", "decaf", "wifi", "place_for_work", "close"]
        


class WorkingHoursSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WorkingHours
        fields = ["whID", "establishment", "monday_from", "monday_to", "tuesday_from", "tuesday_to", "wednesday_from", "wednesday_to", "thursday_from", "thursday_to", "friday_from", "friday_to", "saturday_from", "saturday_to", "sunday_from", "sunday_to"]