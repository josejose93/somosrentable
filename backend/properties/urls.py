from django.urls import path
from . import views_auth, views_properties
from .views_properties import property_detail
from .views_visits import create_visit_request
from .views_agent import agent_visit_requests

urlpatterns = [
    path('api/login/', views_auth.login_view, name='login'),
    path('api/logout/', views_auth.logout_view, name='logout'),
    path('api/me/', views_auth.me_view, name='me'),
    path('api/properties/', views_properties.properties_view, name='properties'),
    path('api/properties/<slug:slug>/', property_detail, name='property_detail'),
    path('api/visit-request/', create_visit_request, name='create_visit_request'),
    path('api/agent/visits/', agent_visit_requests, name='agent_visit_requests'),
    path('api/agent/properties/', views_properties.agent_properties, name='agent_properties'),
    path('api/properties/<int:property_id>/upload-image/', views_properties.upload_property_image, name='upload_property_image'),
]
