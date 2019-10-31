# Generated by Django 2.2.4 on 2019-10-22 16:15

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hospital_Name',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hospital_name', models.CharField(max_length=100)),
                ('image', models.ImageField(null='True', upload_to='pics')),
                ('street_name', models.CharField(max_length=100, null='True')),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone',
        ),
        migrations.AddField(
            model_name='user',
            name='confirm_password',
            field=models.CharField(max_length=50, null=True, validators=[django.core.validators.RegexValidator(code='nomatch', message='Length has to be 6', regex='^.{6}$')]),
        ),
        migrations.CreateModel(
            name='DoctorProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Degree', models.CharField(max_length=100)),
                ('Years_of_Experience', models.IntegerField()),
                ('Specialization', models.CharField(choices=[('Cardio', 'Cardiologists'), ('Derma', 'Dermatalogistclas'), ('Immuno', 'Immunologists'), ('Endocrin', 'Endocrinologists'), ('Neuro', 'Neurologist'), ('Path', 'Pathologist'), ('Psych', 'Psychiatrists')], max_length=100)),
                ('Contact', models.IntegerField()),
                ('image', models.ImageField(null='True', upload_to='pics')),
                ('Hospital', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='quickstart.Hospital_Name')),
            ],
        ),
    ]
