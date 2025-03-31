import os
import django
from io import BytesIO
from PIL import Image

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from properties.models import Agent, Property, PropertyImage
from django.core.files.base import ContentFile
from faker import Faker

User = get_user_model()
fake = Faker()

def generate_dummy_image(name='image.jpg'):
    img = Image.new('RGB', (800, 600), color=(fake.random_int(0,255), fake.random_int(0,255), fake.random_int(0,255)))
    buffer = BytesIO()
    img.save(buffer, format='JPEG')
    return ContentFile(buffer.getvalue(), name=name)

agent_user, created = User.objects.get_or_create(
    username='agent2',
    defaults={
        'first_name': 'Agent',
        'last_name': 'Two',
        'email': 'agent2@example.com',
        'is_agent': True,
    }
)
agent_user.set_password('supersecret123456')
agent_user.save()

agent_profile, created = Agent.objects.get_or_create(user=agent_user, defaults={
    'phone': '987654321',
    'agency': 'Super Agency'
})

for i in range(6):
    prop = Property.objects.create(
        title=fake.sentence(nb_words=6),
        description=fake.paragraph(nb_sentences=3),
        address=fake.street_address(),
        city=fake.city(),
        price=fake.pydecimal(left_digits=6, right_digits=2, positive=True),
        bedrooms=fake.random_int(min=1, max=5),
        bathrooms=fake.random_int(min=1, max=3),
        area=fake.random_int(min=40, max=200),
        agent=agent_profile
    )

    for j in range(7):
        image_file = generate_dummy_image(f"property_{i}_img_{j}.jpg")
        PropertyImage.objects.create(property=prop, image=image_file)

normal_user, created = User.objects.get_or_create(
    username='user2',
    defaults={
        'first_name': 'Normal',
        'last_name': 'User',
        'email': 'user2@example.com',
    }
)
normal_user.set_password('supersecret123456')
normal_user.save()

print("✅ Setup completo: agente 'agent2' con 6 propiedades (7 imágenes cada una) y usuario 'user2' creados.")
