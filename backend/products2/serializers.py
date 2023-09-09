from rest_framework.serializers import ModelSerializer
from shops1.models import Shop
from shops1.serializers import AddedBySerializer, CategorySerializer
from .models import Product


class ShopOwnedSerializer(ModelSerializer):
    added_by = AddedBySerializer(allow_null=True)
    category = CategorySerializer(allow_null=True)

    class Meta:
        model = Shop
        fields = [
            'added_by', 'name', 'img', 'address',
            'mobile', 'business_time',
            'working_day', 'delivery_time',
            'category'
        ]
        # fields = '__all__'


class ProductSerializer(ModelSerializer):
    shop_owned = ShopOwnedSerializer(allow_null=True)
    category = CategorySerializer(allow_null=True)

    # # static method
    # discount_percent = serializers.ReadOnlyField()

    class Meta:
        model = Product
        # fields = '__all__'
        fields = [
            'id', 'shop_owned',
            'name', 'category', 'price', 'description',
            'img', 'new', 'unit', 'quantity',
            'discount', 'discount_percent',
            'discount_price',
            'created_date', 'updated_date'
        ]


