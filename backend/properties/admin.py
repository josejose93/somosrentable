# properties/admin.py

from django.contrib import admin
from .models import User, Agent, Property, PropertyImage, VisitRequest
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Role', {'fields': ('is_agent',)}),
    )
    list_display = ('username', 'email', 'is_agent', 'is_staff', 'is_superuser')

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone', 'agency')

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'city', 'price', 'agent', 'published_at')
    prepopulated_fields = {"slug": ("title",)}
    inlines = [PropertyImageInline]

@admin.register(VisitRequest)
class VisitRequestAdmin(admin.ModelAdmin):
    list_display = ('property', 'user', 'visit_date', 'created_at')
