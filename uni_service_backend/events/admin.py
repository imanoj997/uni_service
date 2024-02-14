from django.contrib import admin
from .models import Event, EventRegistration


class EventAdmin(admin.ModelAdmin):
    """
    Admin view for the Event model.
    """
    list_display = ('name', 'event_date', 'event_time', 'location',)
    search_fields = ('name', 'location',)
    list_filter = ('event_date',)
    ordering = ('-event_date', 'event_time')
    date_hierarchy = 'event_date'


class EventRegistrationAdmin(admin.ModelAdmin):
    """
    Admin view for the EventRegistration model.
    """
    list_display = ('user', 'event', 'event_date', 'event_time',)
    list_select_related = ('user', 'event',)
    search_fields = ('user__username', 'event__name',)
    list_filter = ('event__event_date',)
    ordering = ('-event__event_date', 'event__event_time')

    def event_date(self, obj):
        return obj.event.event_date
    event_date.short_description = 'Event Date'
    event_date.admin_order_field = 'event__event_date'

    def event_time(self, obj):
        return obj.event.event_time
    event_time.short_description = 'Event Time'
    event_time.admin_order_field = 'event__event_time'


admin.site.register(Event, EventAdmin)
admin.site.register(EventRegistration, EventRegistrationAdmin)
