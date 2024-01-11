from django.contrib.auth.models import User
from django.db import models


class Cities(models.Model):
    cityID = models.AutoField(verbose_name="ID города", primary_key=True)
    name = models.CharField(verbose_name="Название города", max_length=50)


class MetroStations(models.Model):
    msID = models.AutoField(verbose_name="ID станции метро", primary_key=True)
    name = models.CharField(verbose_name="Название станции метро", max_length=50)
    city = models.ForeignKey(Cities, on_delete=models.CASCADE, verbose_name="Город")
    longitude = models.FloatField(verbose_name="Долгота")
    latitude = models.FloatField(verbose_name="Широта")


class Address(models.Model):
    addressID = models.AutoField(verbose_name="ID адреса", primary_key=True)
    city = models.ForeignKey(Cities, on_delete=models.CASCADE, verbose_name="Город")
    metro_station = models.ForeignKey(MetroStations, on_delete=models.CASCADE, verbose_name="Станция метро")
    street = models.CharField(verbose_name="Улица", max_length=100)
    building = models.CharField(verbose_name="Номер дома", max_length=10)
    longitude = models.FloatField(verbose_name="Долгота")
    latitude = models.FloatField(verbose_name="Широта")


class WorkingHours(models.Model):
    whID = models.AutoField(verbose_name="ID графика", primary_key=True)
    day_of_week = models.CharField(verbose_name="День недели", max_length=10)
    time_from = models.TimeField(verbose_name="Время открытия")
    time_to = models.TimeField(verbose_name="Время закрытия")


class Establishments(models.Model):
    establishmentID = models.AutoField(verbose_name="ID заведения", primary_key=True)
    name = models.CharField(verbose_name="Название заведения", max_length=100)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, verbose_name="Адрес")
    working_hours = models.ForeignKey(WorkingHours, on_delete=models.CASCADE, verbose_name="График работы")
    description = models.TextField(verbose_name="Описание", max_length=200)
    picture = models.URLField(verbose_name="Изображение")
    avg_bill = models.FloatField(verbose_name="Средний чек")
    veg_positions = models.BooleanField(verbose_name="Наличие вегетарианских позиций")
    alt_brewing = models.BooleanField(verbose_name="Наличие альтернативных способов заваривания")
    alt_milk = models.BooleanField(verbose_name="Наличие альтернативного молока")
    pets = models.BooleanField(verbose_name="Наличие возможности посетить с питомцем")
    food = models.BooleanField(verbose_name="Наличие кухни")
    non_coffee_drink = models.BooleanField(verbose_name="Наличие не кофейных напитков")
    decaf = models.BooleanField(verbose_name="Наличие декафа")
    wifi = models.BooleanField(verbose_name="Наличие wifi")
    place_for_work = models.BooleanField(verbose_name="Наличие мест для работы")

