from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import *
from .models import *


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ("email", "nickname", "sex", "birthdate", "occupation", "is_business", "is_staff", "is_active",)
    list_filter = ("email", "nickname", "sex", "birthdate", "occupation", "is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("email", "nickname", "sex", "birthdate", "occupation", "is_business", "password")}),
        ("Разрешения", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "nickname", "sex", "birthdate", "occupation", "is_business", "password1", "password2",
                "is_staff",
                "is_active", "groups", "user_permissions"
            )}
         ),
    )
    search_fields = ("email", "nickname",)
    ordering = ("email",)


class PostsAdmin(admin.ModelAdmin):
    add_form = PostsCreationForm
    form = PostsChangeForm
    model = Posts
    list_display = ("user", "establishment", "picture", "rating", "body", "time_created", "time_edited",)
    list_filter = ("user", "establishment", "picture", "rating", "body", "time_created", "time_edited",)
    fieldsets = (
        (None, {"fields": ("user", "establishment", "picture", "rating", "body")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "user", "establishment", "picture", "rating", "body")}
         ),
    )
    search_fields = ("user__email",)
    ordering = ("user__email",)


class CommentsAdmin(admin.ModelAdmin):
    add_form = CommentsCreationForm
    form = CommentsChangeForm
    model = Comments
    list_display = ("user", "post", "body", "time_created", "time_edited")
    list_filter = ("user", "post",)
    fieldsets = (
        (None, {"fields": ("user", "post", "body")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "user", "post", "body")}
         ),
    )
    search_fields = ("user__email",)
    ordering = ("user__email",)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Posts, PostsAdmin)
admin.site.register(Comments, CommentsAdmin)
