from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


UserAdmin.list_display += ('info',)
UserAdmin.fieldsets += (
    ('Info', {
        'fields': ('info', )
    }),
)

admin.site.register(User, UserAdmin)
