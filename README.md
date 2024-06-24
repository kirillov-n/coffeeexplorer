# Coffee Explorer
Приложение для поиска и выбора кофеен

### Главная страница
<p align="center">
  <img src="screenshots\main.png?raw=true" />
</p>

### Страница заведения
<p align="center">
  <img src="screenshots\details.png?raw=true"/>
</p>

### Как развернуть проект?

Создать .env файл в корне проекта со следующим содержимым:

    POSTGRES_NAME=
    POSTGRES_USER=
    POSTGRES_PASSWORD=

Поднять проект с помощью Docker

    docker-compose up -d

В контейнере djangoapp выполнить команды:

    python manage.py makemigrations
    python manage.py migrate

Затем необходимо заполнить таблицу заведений

    ...

После этого можно создать суперпользователя

    python manage.py createsuperuser

*Запущенный сервер доступен по адресу 127.0.0.1:8000*
