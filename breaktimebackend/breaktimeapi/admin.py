from django.contrib import admin

# Register your models here.

from .models import Timesheet, CustomUser, Course, Event, Assignment


# class CustomUserAdmin(admin.ModelAdmin):
#     # class Meta:
#     model = CustomUser


# admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register([Timesheet, Course, Event, Assignment])
# admin.site.register()
# admin.site.register(CustomUser)
