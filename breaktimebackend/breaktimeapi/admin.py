from django.contrib import admin

# Register your models here.

from .models import Shift, CustomUser, Course, Event, Assignment


# class CustomUserAdmin(admin.ModelAdmin):
#     # class Meta:
#     model = CustomUser


# admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register([Shift, Course, Event, Assignment])
# admin.site.register()
# admin.site.register(CustomUser)
