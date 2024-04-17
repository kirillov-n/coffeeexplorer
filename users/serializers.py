from django.contrib.auth.models import Group, User
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["userID", "email", "nickname", "sex", "birthdate", "occupation", "is_business", "password"]
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


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]