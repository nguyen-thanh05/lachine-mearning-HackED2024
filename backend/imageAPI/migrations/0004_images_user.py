# Generated by Django 5.0.1 on 2024-01-06 23:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("imageAPI", "0003_alter_images_description"),
        ("user", "0003_alter_user_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="images",
            name="user",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="user.user",
            ),
        ),
    ]
