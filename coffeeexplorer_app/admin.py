from django.contrib import admin

from .forms import *
from .models import *


class CitiesAdmin(admin.ModelAdmin):
    add_form = CitiesCreationForm
    form = CitiesChangeForm
    model = Cities
    list_display = ("name",)
    list_filter = ("name",)
    fieldsets = (
        (None, {"fields": ("name",)}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("name",)}
         ),
    )
    search_fields = ("name",)
    ordering = ("name",)


class MetroStationsAdmin(admin.ModelAdmin):
    add_form = MetroStationsCreationForm
    form = MetroStationsChangeForm
    model = MetroStations
    list_display = ("name", "city", "longitude", "latitude",)
    fieldsets = (
        (None, {"fields": ("name", "city", "longitude", "latitude",)}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("name", "city", "longitude", "latitude",)}
         ),
    )
    search_fields = ("name", "city__name",)
    ordering = ("name",)


class AddressAdmin(admin.ModelAdmin):
    add_form = AddressCreationForm
    form = AddressChangeForm
    model = Address
    list_display = ("city", "metro_station", "street", "building", "latitude", "longitude",)
    fieldsets = (
        (None, {'fields': ("city", "metro_station", "street", "building", "latitude", "longitude",)}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("city", "metro_station", "street", "building", "latitude", "longitude",)}
         ),
    )
    search_fields = ("city__name", "street")
    ordering = ("city",)


class EstablishmentsAdmin(admin.ModelAdmin):
    add_form = EstablishmentsCreationForm
    form = EstablishmentsChangeForm
    model = Establishments
    list_display = ("name", "address", "description", "picture", "avg_bill", "veg_positions", "alt_brewing", "alt_milk",
                    "small_pets", "big_pets", "food", "non_coffee_drink", "decaf", "wifi", "place_for_work", "specialty_coffee", "close")
    list_filter = ("name", "address", "avg_bill", "veg_positions", "alt_brewing", "alt_milk",
                   "small_pets", "big_pets","food", "non_coffee_drink", "decaf", "wifi", "place_for_work", "specialty_coffee", "close")
    fieldsets = (
        (None, {'fields': ("name", "address", "description", "picture", "avg_bill", "veg_positions", "alt_brewing",
                           "alt_milk", "small_pets", "big_pets", "food", "non_coffee_drink", "decaf", "wifi", "place_for_work", "specialty_coffee")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("name", "address", "description", "picture", "avg_bill", "veg_positions", "alt_brewing",
                       "alt_milk", "small_pets", "big_pets","food", "non_coffee_drink", "decaf", "wifi", "place_for_work", "specialty_coffee")}
         ),
    )
    search_fields = ("name",)
    ordering = ("name",)


class WorkingHoursAdmin(admin.ModelAdmin):
    add_form = WorkingHoursCreationForm
    form = WorkingHoursChangeForm
    model = WorkingHours
    list_display = ("establishment", "monday_from", "monday_to", "tuesday_from", "tuesday_to", "wednesday_from",
                    "wednesday_to", "thursday_from", "thursday_to", "friday_from", "friday_to", "saturday_from",
                    "saturday_to", "sunday_from", "sunday_to",)
    fieldsets = (
        (None, {'fields': ("establishment", "monday_from", "monday_to", "tuesday_from", "tuesday_to", "wednesday_from",
                           "wednesday_to", "thursday_from", "thursday_to", "friday_from", "friday_to", "saturday_from",
                           "saturday_to", "sunday_from", "sunday_to",)}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("establishment", "monday_from", "monday_to", "tuesday_from", "tuesday_to", "wednesday_from",
                       "wednesday_to", "thursday_from", "thursday_to", "friday_from", "friday_to", "saturday_from",
                       "saturday_to", "sunday_from", "sunday_to",)}
         ),
    )
    search_fields = ("establishment",)
    ordering = ("establishment",)


admin.site.register(Cities, CitiesAdmin)
admin.site.register(MetroStations, MetroStationsAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Establishments, EstablishmentsAdmin)
admin.site.register(WorkingHours, WorkingHoursAdmin)
