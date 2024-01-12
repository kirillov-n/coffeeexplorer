from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms import ModelForm

from .models import *


class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ("email", )


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = ("email", )


class PostsCreationForm(ModelForm):
    class Meta:
        model = Posts
        fields = ("user", "establishment", "picture", "rating", "body",)


class PostsChangeForm(ModelForm):
    class Meta:
        model = Posts
        fields = ("user", "establishment", "picture", "rating", "body",)


class CommentsCreationForm(ModelForm):
    class Meta:
        model = Comments
        fields = ("user", "post", "body",)


class CommentsChangeForm(ModelForm):
    class Meta:
        model = Comments
        fields = ("user", "post", "body",)
