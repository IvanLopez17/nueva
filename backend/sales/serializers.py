from rest_framework import serializers
from .models import Sale

class SaleSerializer(serializers.ModelSerializer):
    advisor = serializers.StringRelatedMethod(read_only=True)
    commission = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    
    class Meta:
        model = Sale
        fields = [
            'id', 'advisor', 'sale_date', 'registration_date', 
            'reservation_code', 'client', 'total_sale', 'commission',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'advisor', 'registration_date', 'commission', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['advisor'] = self.context['request'].user
        return super().create(validated_data)

class DashboardStatsSerializer(serializers.Serializer):
    total_sales = serializers.IntegerField()
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_commission = serializers.DecimalField(max_digits=15, decimal_places=2)
    monthly_sales = serializers.ListField(child=serializers.DictField())