# Generated by Django 4.2.1 on 2023-06-10 15:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("sportista", "0017_user_user_sports_delete_usersportinterest"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="user_sports",
        ),
    ]