# Generated by Django 3.2 on 2023-02-09 05:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts0', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HelpOrContact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('email', models.EmailField(max_length=254)),
                ('mobile', models.CharField(max_length=11)),
                ('message', models.TextField()),
            ],
        ),
    ]
