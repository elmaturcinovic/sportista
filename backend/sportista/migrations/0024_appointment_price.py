# Generated by Django 4.2.1 on 2023-06-15 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sportista', '0023_rename_time_appointment_time_start_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='price',
            field=models.CharField(default='100 KM', max_length=100),
        ),
    ]
