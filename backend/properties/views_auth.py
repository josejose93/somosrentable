import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

User = get_user_model()

@csrf_exempt
def login_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)

    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_agent': user.is_agent,  # si tienes ese campo
            })
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

@csrf_exempt
def logout_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)

    logout(request)
    return JsonResponse({'message': 'Logged out'})

def me_view(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({'error': 'Not authenticated'}, status=401)
    return JsonResponse({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_agent': user.is_agent
    })
