# Generated by Django 4.2.1 on 2023-06-07 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sportista", "0009_remove_sportshall_sports_remove_user_user_sport_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="sport",
            name="sport_name",
            field=models.CharField(max_length=255),
        ),
    ]