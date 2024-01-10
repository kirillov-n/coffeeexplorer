from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    SEX_CHOICES = {
        "M": "Man",
        "W": "Woman",
    }
    OCCUPATION_CHOICES = {
        "RS": "Remote student",
        "NRS": "Not remote student",
        "RW": "Remote worker",
        "NRW": "Not remote worker",
        "OAR": "On a rest"

    }
    user_id = models.BigAutoField("Id пользователя", primary_key=True, unique=True)
    email = models.EmailField(_("Email адрес"), unique=True)
    nickname = models.CharField("Никнейм")
    sex = models.CharField(_("Пол"), choices=SEX_CHOICES)
    birthdate = models.DateField("Дата рождения")
    occupation = models.CharField("Занятость", choices=OCCUPATION_CHOICES)
    date_joined = models.DateTimeField("Дата регистрации", default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nickname", "sex", "birthdate", "occupation"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email