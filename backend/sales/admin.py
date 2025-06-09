from django.contrib import admin
from .models import Sale

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('reservation_code', 'client', 'advisor', 'sale_date', 'total_sale', 'commission')
    list_filter = ('advisor', 'sale_date', 'registration_date')
    search_fields = ('reservation_code', 'client', 'advisor__email', 'advisor__first_name', 'advisor__last_name')
    readonly_fields = ('commission', 'registration_date', 'created_at', 'updated_at')
    date_hierarchy = 'sale_date'
    
    fieldsets = (
        ('Información de la Venta', {
            'fields': ('advisor', 'client', 'reservation_code', 'sale_date')
        }),
        ('Información Financiera', {
            'fields': ('total_sale', 'commission')
        }),
        ('Fechas', {
            'fields': ('registration_date', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )