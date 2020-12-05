from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class Timesheet(models.Model):
    '''class TimesheetType(models.TextChoices):
        PARTICIPANT = 'P', _('Participant')
        SHELTER = 'V', _('Volunteer')
        STAFF = 'S', _('Staff')'''
    # need foreign key to custom user!
    name = models.CharField(max_length=255)
    type = models.CharField(
        max_length=1,
        # choices=TimesheetType.choices,
        default=''
    )
    manager = models.CharField(max_length=255)
    funding = models.CharField(max_length=255)
    date = models.DateField(auto_now=False,
                            auto_now_add=False, default="2019-12-14")
    time_from = models.TimeField(auto_now=False, auto_now_add=False, null=True)
    time_to = models.TimeField(auto_now=False, auto_now_add=False, null=True)
    description = models.TextField(default="")

    def _str_(self):
        return(self.name)


class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)


class Event(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField(auto_now=False,
                            auto_now_add=False, default="2019-12-14")
    description = models.CharField(max_length=50)
    attachments = models.CharField(max_length=50)


class Assignment(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    attachments = models.CharField(max_length=50)


# class CustomUser(AbstractUser):
#     employee_name = models.CharField(max_length=120)
