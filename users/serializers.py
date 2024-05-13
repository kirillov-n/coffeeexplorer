from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from coffeeexplorer_app.serializers import EstablishmentSerializer


User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['nickname'] = user.nickname

        return token

class UserProfileSerializer(serializers.Serializer):
    userID = serializers.IntegerField(read_only=True)
    email = serializers.EmailField()
    nickname = serializers.CharField()
    sex = serializers.CharField()
    birthdate = serializers.DateField()
    occupation = serializers.CharField()
    date_joined = serializers.DateTimeField()
    favourites = serializers.PrimaryKeyRelatedField(many=True, queryset=Establishments.objects.all())
    is_business = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    is_active = serializers.BooleanField()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["userID", "email", "nickname", "sex", "birthdate", "occupation", "is_business", "password", "date_joined", "favourites"]
    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            nickname=validated_data['nickname'],
            sex=validated_data['sex'],
            birthdate=validated_data['birthdate'],
            occupation=validated_data['occupation']

        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class PostSerializer(serializers.HyperlinkedModelSerializer):
    establishment = EstablishmentSerializer(read_only=True)
    establishmentID = serializers.PrimaryKeyRelatedField(source='establishment', queryset=Establishments.objects.all(), write_only=True)
    user = UserSerializer(read_only=True)
    userID = serializers.PrimaryKeyRelatedField(source='user', queryset=CustomUser.objects.all(), write_only=True)
    class Meta:
        model = Posts
        fields = ["PostID", "user", "userID", "establishment", "establishmentID", "picture", "rating", "body", "time_created", "time_edited"]


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comments
        fields = ["commentID", "user", "post", "body", "time_created", "time_edited"]
