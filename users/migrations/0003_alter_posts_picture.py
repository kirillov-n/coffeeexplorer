# Generated by Django 5.0.1 on 2024-01-12 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_comments_options_alter_customuser_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/posts', verbose_name='Изображение'),
        ),
    ]
