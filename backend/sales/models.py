from django.db import models
from django.conf import settings
from decimal import Decimal

class Sale(models.Model):
    advisor = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='sales',
        verbose_name='Asesor'
    )
    sale_date = models.DateField(verbose_name='Fecha de Venta')
    registration_date = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de Registro')
    reservation_code = models.CharField(max_length=50, unique=True, verbose_name='Código de Reserva')
    client = models.CharField(max_length=200, verbose_name='Cliente')
    total_sale = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Total de Venta')
    commission = models.DecimalField(max_digits=12, decimal_places=2, verbose_name='Comisión', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-sale_date', '-created_at']
        verbose_name = 'Venta'
        verbose_name_plural = 'Ventas'

    def save(self, *args, **kwargs):
        # Calcular comisión automáticamente (30%)
        self.commission = self.total_sale * Decimal('0.30')
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reservation_code} - {self.client} (${self.total_sale})"