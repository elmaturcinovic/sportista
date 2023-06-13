# Generated by Django 4.2.1 on 2023-06-13 18:01

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("sportista", "0022_remove_appointment_sport_appointment_sports"),
    ]

    operations = [
        migrations.RenameField(
            model_name="appointment",
            old_name="time",
            new_name="time_start",
        ),
        migrations.RemoveField(
            model_name="userappointment",
            name="user",
        ),
        migrations.AddField(
            model_name="appointment",
            name="time_end",
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="userappointment",
            name="users",
            field=models.ManyToManyField(to="sportista.user"),
        ),
        migrations.CreateModel(
            name="Invites",
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
                (
                    "status",
                    models.IntegerField(
                        choices=[(0, "Sent"), (1, "Accepted"), (2, "Rejected")],
                        default=0,
                    ),
                ),
                (
                    "appointment",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="sportista.userappointment",
                    ),
                ),
                (
                    "receiver",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="received_invites",
                        to="sportista.user",
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="sent_invites",
                        to="sportista.user",
                    ),
                ),
            ],
        ),
    ]
