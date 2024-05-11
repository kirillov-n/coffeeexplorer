from django.urls import path, include
from rest_framework import routers
from users import views
from .views import *

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'posts', views.PostViewSet)
router.register(r'comments', views.CommentViewSet)
# router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', SignUpAPIView.as_view(), name='signup'),
    path('signin/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
