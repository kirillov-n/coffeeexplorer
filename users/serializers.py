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
    favourites = serializers.PrimaryKeyRelatedField(queryset=Establishments.objects.all(), many=True)
    is_business = serializers.BooleanField()
    is_staff = serializers.BooleanField()
    is_active = serializers.BooleanField()
    avg_bill = serializers.FloatField()
    veg_positions = serializers.BooleanField()
    alt_brewing = serializers.BooleanField()
    alt_milk = serializers.BooleanField()
    small_pets = serializers.BooleanField()
    big_pets = serializers.BooleanField()
    food = serializers.BooleanField()
    non_coffee_drink = serializers.BooleanField()
    decaf = serializers.BooleanField()
    wifi = serializers.BooleanField()
    place_for_work = serializers.BooleanField()
    specialty_coffee = serializers.BooleanField()
    recommendations = serializers.ListField(
        child=serializers.IntegerField()  # Тип элементов массива
    )
    def update(self, instance, validated_data):
    # Обновляем каждое поле, если оно присутствует в данных
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        recommendations = serializers.ListField(
        child=serializers.IntegerField()
    )
        fields = ["userID", "email", "nickname", "sex", "birthdate", "occupation", "is_business", "password", "date_joined", "favourites", "avg_bill", "veg_positions", "alt_brewing", "alt_milk", "small_pets", "big_pets", "food", "non_coffee_drink", "decaf", "wifi", "place_for_work", "specialty_coffee", "recommendations"]
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
    post = PostSerializer(read_only=True)
    postID = serializers.PrimaryKeyRelatedField(source='post', queryset=Posts.objects.all(), write_only=True)
    class Meta:
        model = Comments
        fields = ["commentID", "user", "post", "postID", "body", "time_created", "time_edited"]
