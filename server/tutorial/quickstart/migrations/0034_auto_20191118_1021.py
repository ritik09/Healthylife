# Generated by Django 2.2.4 on 2019-11-18 04:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0033_auto_20191118_1021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enquiry',
            name='hospital_name',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
