from django.contrib import admin

# Register your models here.

from .models import Timesheet, CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    # class Meta:
    model = CustomUser


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register([Timesheet])
# admin.site.register()
# admin.site.register(CustomUser)
