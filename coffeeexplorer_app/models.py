from django.contrib.auth.models import User
from django.db import models


class Cities(models.Model):
    cityID = models.AutoField(verbose_name="ID города", primary_key=True)
    name = models.CharField(verbose_name="Название города", max_length=50)

    class Meta:
        verbose_name = "Город"
        verbose_name_plural = "Города"

    def __str__(self):
        return self.name


class MetroStations(models.Model):
    msID = models.AutoField(verbose_name="ID станции метро", primary_key=True)
    name = models.CharField(verbose_name="Название станции метро", max_length=50)
    city = models.ForeignKey(Cities, on_delete=models.PROTECT, verbose_name="Город")
    longitude = models.FloatField(verbose_name="Долгота")
    latitude = models.FloatField(verbose_name="Широта")

    class Meta:
        verbose_name = "Станция метро"
        verbose_name_plural = "Станции метро"

    def __str__(self):
        return self.name


class Address(models.Model):
    addressID = models.AutoField(verbose_name="ID адреса", primary_key=True)
    city = models.ForeignKey(Cities, on_delete=models.CASCADE, verbose_name="Город")
    metro_station = models.ForeignKey(MetroStations, on_delete=models.PROTECT, verbose_name="Станция метро")
    street = models.CharField(verbose_name="Улица", max_length=100)
    building = models.CharField(verbose_name="Номер дома", max_length=10)
    longitude = models.FloatField(verbose_name="Долгота")
    latitude = models.FloatField(verbose_name="Широта")

    class Meta:
        verbose_name = "Адрес"
        verbose_name_plural = "Адреса"

    def __str__(self):
        return f"гор. {self.city}, ул. {self.street}, д. {self.building}"


class Establishments(models.Model):
    establishmentID = models.AutoField(verbose_name="ID заведения", primary_key=True)
    name = models.CharField(verbose_name="Название заведения", max_length=100)
    address = models.ForeignKey(Address, on_delete=models.PROTECT, verbose_name="Адрес")
    description = models.TextField(verbose_name="Описание", max_length=200)
    # picture = models.URLField(verbose_name="Изображение")
    picture = models.ImageField(verbose_name="Изображение", upload_to="uploads/establishments")
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

    class Meta:
        verbose_name = "Заведение"
        verbose_name_plural = "Заведения"

    def __str__(self):
        return self.name


class WorkingHours(models.Model):
    """
    DAYS_OF_WEEK = (
        ("Пн", "Понедельник"),
        ("Вт", "Вторник"),
        ("Ср", "Среда"),
        ("Чт", "Четверг"),
        ("Пт", "Пятница"),
        ("Сб", "Суббота"),
        ("Вс", "Воскресенье"),
    )
    """
    whID = models.AutoField(verbose_name="ID графика", primary_key=True)
    establishment = models.ForeignKey(Establishments, on_delete=models.PROTECT, verbose_name="Заведение")
    """
    day_of_week = models.CharField(verbose_name="День недели", choices=DAYS_OF_WEEK)
    time_from = models.TimeField(verbose_name="Время открытия")
    time_to = models.TimeField(verbose_name="Время закрытия")
    """
    monday_from = models.TimeField(verbose_name="Понедельник открытие")
    monday_to = models.TimeField(verbose_name="Понедельник закрытие")
    tuesday_from = models.TimeField(verbose_name="Вторник открытие")
    tuesday_to = models.TimeField(verbose_name="Вторник закрытие")
    wednesday_from = models.TimeField(verbose_name="Среда открытие")
    wednesday_to = models.TimeField(verbose_name="Среда закрытие")
    thursday_from = models.TimeField(verbose_name="Четверг открытие")
    thursday_to = models.TimeField(verbose_name="Четверг закрытие")
    friday_from = models.TimeField(verbose_name="Пятница открытие")
    friday_to = models.TimeField(verbose_name="Пятница закрытие")
    saturday_from = models.TimeField(verbose_name="Суббота открытие")
    saturday_to = models.TimeField(verbose_name="Суббота закрытие")
    sunday_from = models.TimeField(verbose_name="Воскресенье открытие")
    sunday_to = models.TimeField(verbose_name="Воскресенье закрытие")

    class Meta:
        verbose_name = "График работы"
        verbose_name_plural = "Графики работы"

    def __str__(self):
        return f"График {self.establishment.name}"
