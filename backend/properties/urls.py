from django.urls import path
from . import views_auth, views_properties

urlpatterns = [
    path('api/login/', views_auth.login_view, name='login'),
    path('api/logout/', views_auth.logout_view, name='logout'),
    path('api/me/', views_auth.me_view, name='me'),
    path('api/properties/', views_properties.properties_list, name='properties_list'),
]
