from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth
from datetime import datetime, timedelta
from .models import Sale
from .serializers import SaleSerializer, DashboardStatsSerializer

class SaleViewSet(viewsets.ModelViewSet):
    serializer_class = SaleSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Sale.objects.filter(advisor=self.request.user)

    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        user_sales = self.get_queryset()
        
        # Estadísticas generales
        stats = user_sales.aggregate(
            total_sales=Count('id'),
            total_amount=Sum('total_sale') or 0,
            total_commission=Sum('commission') or 0
        )
        
        # Ventas mensuales de los últimos 6 meses
        six_months_ago = datetime.now() - timedelta(days=180)
        monthly_data = (
            user_sales
            .filter(sale_date__gte=six_months_ago)
            .annotate(month=TruncMonth('sale_date'))
            .values('month')
            .annotate(
                sales=Count('id'),
                amount=Sum('total_sale')
            )
            .order_by('month')
        )
        
        # Formatear datos mensuales
        monthly_sales = []
        for item in monthly_data:
            monthly_sales.append({
                'month': item['month'].strftime('%b %Y'),
                'sales': item['sales'],
                'amount': float(item['amount'] or 0)
            })
        
        response_data = {
            **stats,
            'monthly_sales': monthly_sales
        }
        
        serializer = DashboardStatsSerializer(response_data)
        return Response(serializer.data)