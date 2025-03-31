from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Property, Agent, PropertyImage
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST
import json

def build_absolute_uri(request, relative_path):
    return request.build_absolute_uri(relative_path)

@csrf_exempt
def properties_view(request):
    if request.method == 'GET':
        properties = Property.objects.all().select_related('agent__user').prefetch_related('images')

        def build_absolute_uri(request, relative_path):
            return request.build_absolute_uri(relative_path)

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
                'images': [
                    build_absolute_uri(request, img.image.url)
                    for img in prop.images.all()
                    if img.image and hasattr(img.image, 'url')
                ],
                'published_at': prop.published_at.isoformat()
            })

        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=401)

        try:
            agent = request.user.agent
        except Agent.DoesNotExist:
            return JsonResponse({'error': 'User is not an agent'}, status=403)

        try:
            data = json.loads(request.body)
            property = Property.objects.create(
                title=data['title'],
                description=data['description'],
                address=data['address'],
                city=data['city'],
                price=data['price'],
                bedrooms=data['bedrooms'],
                bathrooms=data['bathrooms'],
                area=data['area'],
                agent=agent
            )
            return JsonResponse({
                'id': property.id,
                'slug': property.slug,
                'title': property.title
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

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

@login_required
def agent_properties(request):
    try:
        agent = request.user.agent
    except Agent.DoesNotExist:
        return JsonResponse({'error': 'User is not linked to an agent profile'}, status=403)

    properties = Property.objects.filter(agent=agent)

    data = [
        {
            'id': p.id,
            'title': p.title,
            'slug': p.slug,
            'price': p.price,
            'city': p.city,
            'created_at': p.published_at,
        }
        for p in properties
    ]

    return JsonResponse(data, safe=False)

@csrf_exempt
@login_required
@require_POST
def upload_property_image(request, property_id):
    try:
        agent = request.user.agent
        property = Property.objects.get(id=property_id, agent=agent)
    except (Agent.DoesNotExist, Property.DoesNotExist):
        return JsonResponse({'error': 'Not allowed'}, status=403)

    image_file = request.FILES.get('image')
    if not image_file:
        return JsonResponse({'error': 'No image uploaded'}, status=400)

    image = PropertyImage.objects.create(property=property, image=image_file)

    return JsonResponse({'image_url': image.image.url})
