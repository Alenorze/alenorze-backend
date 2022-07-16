from django.contrib import admin

from .models import Post, PostImage


class PostAdmin(admin.ModelAdmin):
    pass


class PostImageAdmin(admin.ModelAdmin):
    pass


admin.site.register(Post, PostAdmin)
admin.site.register(PostImage, PostImageAdmin)
