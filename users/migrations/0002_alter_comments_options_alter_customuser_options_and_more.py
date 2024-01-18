# Generated by Django 5.0.1 on 2024-01-12 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comments',
            options={'verbose_name': 'Комментарий', 'verbose_name_plural': 'Комментарии'},
        ),
        migrations.AlterModelOptions(
            name='customuser',
            options={'verbose_name': 'Пользователь', 'verbose_name_plural': 'Пользователи'},
        ),
        migrations.AlterModelOptions(
            name='posts',
            options={'verbose_name': 'Публикация', 'verbose_name_plural': 'Публикации'},
        ),
        migrations.AlterField(
            model_name='customuser',
            name='occupation',
            field=models.CharField(choices=[('RS', 'Учусь на удаленке'), ('NRS', 'Учусь'), ('RW', 'Работаю на удаленке'), ('NRW', 'Работаю'), ('OAR', 'Отдыхаю')], verbose_name='Занятость'),
        ),
    ]