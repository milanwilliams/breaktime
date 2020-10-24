from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class Shift(models.Model):
    class ShiftType(models.TextChoices):
        PARTICIPANT = 'P', _('Participant')
        SHELTER = 'V', _('Volunteer')
        STAFF = 'S', _('Staff')
    # need foreign key to custom user!
    name = models.CharField(max_length=255)
    type = models.CharField(
        max_length=1,
        choices=ShiftType.choices,
        default=''
    )
    manager = models.CharField(max_length=255)
    funding = models.CharField(max_length=255)

    def _str_(self):
        return(self.name)


class CustomUser(AbstractUser):
    employee_name = models.CharField(max_length=120)
