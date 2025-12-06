from rest_framework import serializers
from django.contrib.auth.models import User
from .models import User, Client

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'avatar', 'firebase_uid', 'name',
            'role', 'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ClientSerializer(serializers.ModelSerializer):
    invited_by_name = serializers.CharField(source='invited_by.name', read_only=True)
    
    class Meta:
        model = Client
        fields = [
            'id', 'email', 'avatar', 'project_name', 'project_revenue',
            'status', 'invited_by', 'invited_by_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'invited_by_name']