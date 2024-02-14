from django.contrib import admin
from .models import Scholarship


class ScholarshipAdmin(admin.ModelAdmin):
    """
    Admin view for the Scholarship model.
    """
    list_display = ('name', 'amount', 'study_area', 'course_type', 'deadline',)
    search_fields = ('name', 'study_area', 'course_type',)
    list_filter = ('study_area', 'course_type', 'deadline',)
    ordering = ('-deadline',)
    date_hierarchy = 'deadline'


admin.site.register(Scholarship, ScholarshipAdmin)
