from rest_framework.serializers import ModelSerializer
from .models import Category, Shop
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id', 'name'
        ]
        # fields = '__all__'


class AddedBySerializer(WritableNestedModelSerializer):
    class Meta:
        model = User
        fields = ['username',
                  'email']
        # fields = '__all__'


class ShopSerializer(ModelSerializer):
    added_by = AddedBySerializer(allow_null=True)
    category = CategorySerializer(allow_null=True)

    # it allows us to access obj props
    # user = UserSerializer(allow_null=True)

    class Meta:
        model = Shop
        fields = '__all__'
        # fields = ['name']
