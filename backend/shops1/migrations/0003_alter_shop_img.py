# Generated by Django 3.2 on 2023-02-07 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shops1', '0002_alter_shop_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='img',
            field=models.ImageField(upload_to='shops1/images/shops'),
        ),
    ]
