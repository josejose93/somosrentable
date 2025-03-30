from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify

class User(AbstractUser):
    is_agent = models.BooleanField(default=False)

class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    agency = models.CharField(max_length=100)

    def __str__(self):
        return self.user.get_full_name()

class Property(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.PositiveIntegerField()
    area = models.PositiveIntegerField(help_text="Area in square meters")
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True)
    published_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='property_images/')
    caption = models.CharField(max_length=255, blank=True)

class VisitRequest(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    visit_date = models.DateTimeField()
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
