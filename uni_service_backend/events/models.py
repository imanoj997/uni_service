from django.db import models
from django.conf import settings


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    location = models.CharField(max_length=255)
    event_date = models.DateField()
    event_time = models.TimeField()

    def __str__(self):
        return self.name


class EventRegistration(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'event')
