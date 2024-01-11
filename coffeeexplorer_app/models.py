from django.contrib.auth.models import User
from django.db import models


class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    city_name = models.CharField(max_length=50)


class MetroStations(models.Model):
    ms_id = models.AutoField(primary_key=True)
    ms_name = models.CharField(max_length=50)
    city_id = models.ForeignKey(City, on_delete=models.CASCADE)
    longitude = models.FloatField()
    latitude = models.FloatField()


class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    metro_station = models.ForeignKey(MetroStations, on_delete=models.CASCADE)
    street = models.CharField(max_length=100)
    building = models.CharField(max_length=10)
    longitude = models.FloatField()
    latitude = models.FloatField()


class WorkingHours(models.Model):
    wh_id = models.AutoField(primary_key=True)
    day_of_week = models.CharField(max_length=10)
    time_from = models.TimeField()
    time_to = models.TimeField()


class Establishments(models.Model):
    establishment_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    working_hours = models.ForeignKey(WorkingHours, on_delete=models.CASCADE)
    description = models.TextField(max_length=200)
    picture = models.URLField()
    avg_bill = models.FloatField()
    vegan_positions = models.BooleanField()
    alt_brewing = models.BooleanField()
    alt_milk = models.BooleanField()
    pets = models.BooleanField()
    food = models.BooleanField()
    non_coffee_drink = models.BooleanField()
    decaf = models.BooleanField()
    wifi = models.BooleanField()
    place_for_work = models.BooleanField()

