# Generated by Django 4.2.1 on 2023-06-06 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("sportista", "0005_alter_sportshall_photo_alter_user_user_photo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="user_photo",
            field=models.ImageField(
                default="/media/images/avatar.png", upload_to="media/images"
            ),
        ),
    ]
