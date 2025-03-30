from django.http import JsonResponse
from .models import Property

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
            'images': [img.image.url for img in prop.images.all()],
            'published_at': prop.published_at.isoformat()
        })
    
    return JsonResponse(data, safe=False)
