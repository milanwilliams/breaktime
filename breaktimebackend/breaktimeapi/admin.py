from django.contrib import admin

# Register your models here.

from .models import Shift

admin.site.register([Shift])
