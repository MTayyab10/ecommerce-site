from django.db import models
from django.contrib.auth import get_user_model
from shops1.models import TimeStampModel
from products2.models import Product
User = get_user_model()


class Cart(TimeStampModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_items = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user}"


class CartItem(TimeStampModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.product.name}"  # product name

