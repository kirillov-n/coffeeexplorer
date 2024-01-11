from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


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
                "email", "nickname", "sex", "birthdate", "occupation", "is_business", "password1", "password2", "is_staff",
                "is_active", "groups", "user_permissions"
            )}
         ),
    )
    search_fields = ("email", "nickname",)
    ordering = ("email",)


admin.site.register(CustomUser, CustomUserAdmin)
