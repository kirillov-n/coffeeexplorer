from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

from coffeeexplorer_app.models import Establishments
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
    userID = models.BigAutoField(verbose_name="Id пользователя", primary_key=True, unique=True)
    email = models.EmailField(verbose_name="Email адрес", unique=True)
    nickname = models.CharField(verbose_name="Никнейм")
    sex = models.CharField(verbose_name="Пол", choices=SEX_CHOICES)
    birthdate = models.DateField(verbose_name="Дата рождения")
    occupation = models.CharField(verbose_name="Занятость", choices=OCCUPATION_CHOICES)
    date_joined = models.DateTimeField(verbose_name="Дата регистрации", auto_now_add=True)
    favourites = models.ManyToManyField(Establishments, verbose_name="Избранное")  # многие ко многим
    is_business = models.BooleanField(verbose_name="Бизнес аккаунт", default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nickname", "sex", "birthdate", "occupation"]

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Posts(models.Model):
    PostID = models.AutoField(verbose_name="ID поста", primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, verbose_name="Пользователь")
    establishment = models.ForeignKey(Establishments, on_delete=models.CASCADE, verbose_name="Заведение")
    picture = models.ImageField(verbose_name="Изображение", upload_to="uploads/")
    rating = models.FloatField(verbose_name="Рейтинг")
    body = models.TextField(verbose_name="Текст", max_length=200)
    time_created = models.DateTimeField(verbose_name="Время создания", auto_now_add=True)
    time_edited = models.DateTimeField(verbose_name="Время изменения", auto_now=True)


class Comments(models.Model):
    commentID = models.AutoField(verbose_name="ID комментария", primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, verbose_name="Пользователь")
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, verbose_name="Пост")
    body = models.TextField(verbose_name="Текст", max_length=200)
    time_created = models.DateTimeField(verbose_name="Время создания", auto_now_add=True)
    time_edited = models.DateTimeField(verbose_name="Время изменения", auto_now=True)

