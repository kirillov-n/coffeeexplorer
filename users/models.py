from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.postgres.fields import ArrayField
from coffeeexplorer_app.models import Establishments
from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    SEX_CHOICES = {
        "M": "Мужчина",
        "W": "Женщина",
    }
    OCCUPATION_CHOICES = {
        "RS": "Учусь на удаленке",
        "NRS": "Учусь",
        "RW": "Работаю на удаленке",
        "NRW": "Работаю",
        "OAR": "Отдыхаю"
    }
    userID = models.BigAutoField(verbose_name="Id пользователя", primary_key=True, unique=True)
    email = models.EmailField(verbose_name="Email адрес", unique=True)
    nickname = models.CharField(verbose_name="Никнейм")
    sex = models.CharField(verbose_name="Пол", choices=SEX_CHOICES) # type: ignore
    birthdate = models.DateField(verbose_name="Дата рождения")
    occupation = models.CharField(verbose_name="Занятость", choices=OCCUPATION_CHOICES) # type: ignore
    date_joined = models.DateTimeField(verbose_name="Дата регистрации", auto_now_add=True)
    favourites = models.ManyToManyField(Establishments, verbose_name="Избранное", blank=True, null=True)  # многие ко многим
    is_business = models.BooleanField(verbose_name="Бизнес аккаунт", default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # Далее поля для рекомендаций
    avg_bill = models.FloatField(null=True, blank=True, verbose_name="Допустимый средний чек")
    veg_positions = models.BooleanField(null=True, blank=True,verbose_name="Нужны ли вегетарианские позиции?")
    alt_brewing = models.BooleanField(null=True, blank=True,verbose_name="Нужны ли альтернативные способы заваривания?")
    alt_milk = models.BooleanField(null=True, blank=True,verbose_name="Нужно ли альтернативное молоко")
    small_pets = models.BooleanField(null=True, blank=True,verbose_name="Важна ли возможность посетить с маленькой собакой")
    big_pets = models.BooleanField(null=True, blank=True,verbose_name="Важна ли возможность посетить с большой собакой")
    food = models.BooleanField(null=True, blank=True,verbose_name="Нужна ли кухня")
    non_coffee_drink = models.BooleanField(null=True, blank=True,verbose_name="Нужы ли не кофейные напитки")
    decaf = models.BooleanField(null=True, blank=True,verbose_name="Нужен ли декаф")
    wifi = models.BooleanField(null=True, blank=True,verbose_name="Нужен ли wifi")
    place_for_work = models.BooleanField(null=True, blank=True,verbose_name="Нужны ли места для работы")
    specialty_coffee = models.BooleanField(null=True, blank=True,verbose_name="Нужен ли specialty кофе")
    recommendations = ArrayField(models.IntegerField(), null=True, blank=True, verbose_name="Рекомендации заведений")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nickname", "sex", "birthdate", "occupation"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return self.email


class Posts(models.Model):
    PostID = models.AutoField(verbose_name="ID поста", primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, verbose_name="Пользователь")
    establishment = models.ForeignKey(Establishments, on_delete=models.CASCADE, verbose_name="Заведение")
    picture = models.ImageField(verbose_name="Изображение", upload_to="uploads/posts", null=True, blank=True)
    rating = models.FloatField(verbose_name="Рейтинг", validators=[MinValueValidator(1.0), MaxValueValidator(5.0)])
    body = models.TextField(verbose_name="Текст", max_length=500)
    time_created = models.DateTimeField(verbose_name="Время создания", auto_now_add=True)
    time_edited = models.DateTimeField(verbose_name="Время изменения", auto_now=True)

    class Meta:
        verbose_name = "Публикация"
        verbose_name_plural = "Публикации"

    def __str__(self):
        return f"Отзыв {self.user} об {self.establishment.name}"


class Comments(models.Model):
    commentID = models.AutoField(verbose_name="ID комментария", primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, verbose_name="Пользователь")
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, verbose_name="Пост")
    body = models.TextField(verbose_name="Текст", max_length=200)
    time_created = models.DateTimeField(verbose_name="Время создания", auto_now_add=True)
    time_edited = models.DateTimeField(verbose_name="Время изменения", auto_now=True)

    class Meta:
        verbose_name = "Комментарий"
        verbose_name_plural = "Комментарии"

    def __str__(self):
        return f"Комментарий {self.user} к посту {self.post.user}"
