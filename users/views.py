from django.contrib.auth.models import User
from rest_framework import permissions, viewsets
from .models import *
from users.serializers import *
from django.contrib.auth import get_user_model


User = get_user_model()
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited.
    """
    queryset = Posts.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comments to be viewed or edited.
    """
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]