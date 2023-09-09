from rest_framework.serializers import ModelSerializer
from drf_writable_nested.serializers import WritableNestedModelSerializer
from .models import Order, OrderItem
from shops1.serializers import AddedBySerializer
# from products2.serializers import ProductSerializer
from products2.models import Product
from delivery_address4.models import DeliveryAddress
from django.contrib.auth import get_user_model
User = get_user_model()


# Get delivery address detail
class AddressSerializer(WritableNestedModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = ['id', 'name', 'address', 'city', 'mobile']
        # fields = '__all__'


# Get all order info
class OrderSerializer(ModelSerializer):
    user = AddedBySerializer(allow_null=True)
    address = AddressSerializer(allow_null=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'unique_id',
            'status', 'created_date',
            'sub_total', 'delivery_fee',
            # 'service_fee',
            'total_amount',
            'address', 'name', 'mobile',
            'delivery_address', 'city',
            'shop_detail', 'product_detail',
            'order_item_details'
        ]
        # fields = '__all__'


class OrderInOrderItemSerializer(WritableNestedModelSerializer):
    user = AddedBySerializer(allow_null=True)
    address = AddressSerializer(allow_null=True)

    class Meta:
        model = Order
        fields = ['id', 'unique_id', 'user',
                  'sub_total',
                  'total_amount', 'address']


class ProductSerializer(WritableNestedModelSerializer):

    class Meta:
        model = Product
        # fields = ['name', 'price', 'discount']
        fields = "__all__"

class OrderItemSerializer(ModelSerializer):
    # order = OrderSerializer(allow_null=True)
    order = OrderInOrderItemSerializer(allow_null=True)
    # just import from products2/serializer
    product = ProductSerializer(allow_null=True)

    class Meta:
        model = OrderItem
        fields = [
            'id', 'order', 'product',
            'name', 'price', 'quantity',
            'order_item_details'
        ]
        # fields = '__all__'
