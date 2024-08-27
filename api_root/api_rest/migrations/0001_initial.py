# Generated by Django 5.1 on 2024-08-27 19:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_name', models.CharField(max_length=350)),
                ('job_create_at', models.DateTimeField(auto_now_add=True)),
                ('job_description', models.CharField(max_length=3000)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=350)),
                ('type', models.CharField(max_length=50)),
                ('content', models.TextField()),
                ('job', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='image', to='api_rest.job')),
            ],
        ),
    ]
