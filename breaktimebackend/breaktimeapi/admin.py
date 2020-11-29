from django.contrib import admin

# Register your models here.

from .models import Shift, CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    # class Meta:
    model = CustomUser


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register([Shift])
# admin.site.register()
# admin.site.register(CustomUser)
