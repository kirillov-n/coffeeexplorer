from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from coffeeexplorer_app import views

router = routers.DefaultRouter()
router.register(r'cities', views.CityViewSet)
router.register(r'ms', views.MetroStationViewSet)
router.register(r'addresses', views.AddressViewSet)
router.register(r'establishments', views.EstablishmentViewSet)
router.register(r'wh', views.WorkingHoursViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
