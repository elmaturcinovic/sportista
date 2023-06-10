# Generated by Django 4.2.1 on 2023-06-08 07:51

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("sportista", "0011_alter_sport_sport_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="Day",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=20)),
            ],
        ),
        migrations.RenameField(
            model_name="sportshall",
            old_name="location",
            new_name="address",
        ),
        migrations.AddField(
            model_name="sportshall",
            name="city",
            field=models.CharField(default=django.utils.timezone.now, max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="sportshall",
            name="work_time_begin",
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="sportshall",
            name="work_time_end",
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="sportshall",
            name="working_days",
            field=models.ManyToManyField(to="sportista.day"),
        ),
    ]
