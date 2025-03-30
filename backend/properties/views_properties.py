from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Property

def build_absolute_uri(request, relative_path):
    return request.build_absolute_uri(relative_path)

def properties_list(request):
    properties = Property.objects.all().select_related('agent__user').prefetch_related('images')

    data = []
    for prop in properties:
        data.append({
            'id': prop.id,
            'title': prop.title,
            'slug': prop.slug,
            'description': prop.description,
            'price': float(prop.price),
            'address': prop.address,
            'city': prop.city,
            'bedrooms': prop.bedrooms,
            'bathrooms': prop.bathrooms,
            'area': prop.area,
            'agent': {
                'id': prop.agent.id if prop.agent else None,
                'name': prop.agent.user.get_full_name() if prop.agent else None,
                'phone': prop.agent.phone if prop.agent else None,
            },
            'images': [build_absolute_uri(request, img.image.url) for img in prop.images.all()],
            'published_at': prop.published_at.isoformat()
        })

    return JsonResponse(data, safe=False)

def property_detail(request, slug):
    property = get_object_or_404(
        Property.objects.select_related('agent__user').prefetch_related('images'),
        slug=slug
    )

    data = {
        'id': property.id,
        'title': property.title,
        'slug': property.slug,
        'description': property.description,
        'price': float(property.price),
        'address': property.address,
        'city': property.city,
        'bedrooms': property.bedrooms,
        'bathrooms': property.bathrooms,
        'area': property.area,
        'agent': {
            'id': property.agent.id if property.agent else None,
            'name': property.agent.user.get_full_name() if property.agent else None,
            'phone': property.agent.phone if property.agent else None,
        },
        'images': [build_absolute_uri(request, img.image.url) for img in property.images.all()],
        'published_at': property.published_at.isoformat()
    }

    return JsonResponse(data)
