# Generated by Django 4.2.1 on 2023-06-07 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sportista", "0010_alter_sport_sport_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sport",
            name="sport_name",
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
