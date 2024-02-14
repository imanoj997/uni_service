from django.db import models
from django.conf import settings
from datetime import datetime, date, timedelta

class StudyRoom(models.Model):
    room_name = models.CharField(max_length=255, unique=True)
    floor_level = models.PositiveIntegerField()
    description = models.TextField(blank=True)
    max_capacity = models.PositiveIntegerField()
    image = models.ImageField(upload_to='study_rooms/', blank=True, null=True)

    def __str__(self):
        return self.room_name

class StudyRoomBooking(models.Model):
    room = models.ForeignKey(StudyRoom, on_delete=models.CASCADE, related_name="bookings")
    booked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    booked_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def save(self, *args, **kwargs):
        self.end_time = (datetime.combine(date.min, self.start_time) + timedelta(hours=2)).time()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking for {self.room.room_name} by {self.booked_by.username} on {self.booked_date}-{self.start_time}"
