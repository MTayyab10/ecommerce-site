# Generated by Django 3.2 on 2023-02-07 10:41

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shops1', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='img',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='image'),
        ),
    ]