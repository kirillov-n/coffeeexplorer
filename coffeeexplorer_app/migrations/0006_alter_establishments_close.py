# Generated by Django 5.0.1 on 2024-01-17 13:13

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coffeeexplorer_app', '0005_alter_establishments_close'),
    ]

    operations = [
        migrations.AlterField(
            model_name='establishments',
            name='close',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, null=True, size=None, verbose_name='Похожие заведения'),
        ),
    ]