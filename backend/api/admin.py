from django.contrib import admin
from .models import User, Client


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('avatar' ,'name', 'email', 'role', 'is_active', 'created_at')
    list_filter = ('role', 'is_active', 'created_at')
    search_fields = ('name', 'email')
    readonly_fields = ('id', 'created_at', 'updated_at')
    ordering = ('-created_at',)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('project_name', 'email', 'status', 'project_revenue', 'invited_by', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('project_name', 'email')
    readonly_fields = ('id', 'created_at', 'updated_at')
    ordering = ('-created_at',)
