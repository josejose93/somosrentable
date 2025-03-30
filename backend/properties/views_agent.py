from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import VisitRequest

@login_required
def agent_visit_requests(request):
    user = request.user

    if not user.is_agent:
        return JsonResponse({'error': 'Only agents can access this endpoint'}, status=403)

    # Obtener las visitas solo para las propiedades del agente
    visits = VisitRequest.objects.filter(property__agent__user=user).select_related('property', 'user')

    data = []
    for visit in visits:
        data.append({
            'visit_id': visit.id,
            'visit_date': visit.visit_date.isoformat(),
            'message': visit.message,
            'property': {
                'id': visit.property.id,
                'title': visit.property.title,
                'slug': visit.property.slug,
            },
            'user': {
                'id': visit.user.id,
                'username': visit.user.username,
                'email': visit.user.email,
            },
        })

    return JsonResponse(data, safe=False)
