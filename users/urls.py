from django.urls import path, include
from rest_framework import routers
from users import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'comments', views.CommentViewSet)
# router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
