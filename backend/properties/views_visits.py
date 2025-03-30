import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils.dateparse import parse_datetime
from django.shortcuts import get_object_or_404
from .models import Property, VisitRequest

@csrf_exempt
@login_required
def create_visit_request(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)

    try:
        data = json.loads(request.body)
        property_id = data.get('property_id')
        visit_date = parse_datetime(data.get('visit_date'))
        message = data.get('message', '')

        property = get_object_or_404(Property, id=property_id)

        visit = VisitRequest.objects.create(
            property=property,
            user=request.user,
            visit_date=visit_date,
            message=message
        )

        return JsonResponse({
            'message': 'Visit request created successfully',
            'visit_id': visit.id
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
