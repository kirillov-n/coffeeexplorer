from django.forms import ModelForm
from .models import *


class CitiesCreationForm(ModelForm):

    class Meta:
        model = Cities
        fields = ("name",)


class CitiesChangeForm(ModelForm):

    class Meta:
        model = Cities
        fields = ("name",)


class MetroStationsCreationForm(ModelForm):
    class Meta:
        model = MetroStations
        fields = ("name", "city", "longitude", "latitude")


class MetroStationsChangeForm(ModelForm):
    class Meta:
        model = MetroStations
        fields = ("name", "city", "longitude", "latitude")


class AddressCreationForm(ModelForm):
    class Meta:
        model = Address
        fields = ("city", "metro_station", "street", "building", "longitude", "latitude")


class AddressChangeForm(ModelForm):
    class Meta:
        model = Address
        fields = ("city", "metro_station", "street", "building", "longitude", "latitude")


class EstablishmentsCreationForm(ModelForm):
    class Meta:
        model = Establishments
        fields = ("name", "address", "description", "picture", "avg_bill", "veg_positions", "alt_brewing", "alt_milk",
                  "small_pets", "food", "non_coffee_drink", "decaf", "wifi", "place_for_work")


class EstablishmentsChangeForm(ModelForm):
    class Meta:
        model = Establishments
        fields = ("name", "address", "description", "picture", "avg_bill", "veg_positions", "alt_brewing", "alt_milk",
                  "small_pets", "food", "non_coffee_drink", "decaf", "wifi", "place_for_work")


class WorkingHoursCreationForm(ModelForm):
    class Meta:
        model = WorkingHours
        fields = ("establishment", "monday_from", "monday_to", "tuesday_from", "tuesday_to", "wednesday_from",
                  "wednesday_to", "thursday_from", "thursday_to", "friday_from", "friday_to", "saturday_from",
                  "saturday_to", "sunday_from", "sunday_to")


class WorkingHoursChangeForm(ModelForm):
    class Meta:
        model = WorkingHours
        fields = ("establishment", "monday_from", "monday_to", "tuesday_from", "tuesday_to", "wednesday_from",
                  "wednesday_to", "thursday_from", "thursday_to", "friday_from", "friday_to", "saturday_from",
                  "saturday_to", "sunday_from", "sunday_to")
