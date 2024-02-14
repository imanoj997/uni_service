from django.db import models


class Scholarship(models.Model):
    name = models.CharField(max_length=255)
    amount = models.PositiveIntegerField()
    image = models.ImageField(upload_to='scholarships/', blank=True, null=True)
    study_area = models.CharField(max_length=255)
    course_type = models.CharField(max_length=255)
    description = models.TextField()
    deadline = models.DateField()
    terms_and_conditions = models.TextField()

    def __str__(self):
        return self.name
