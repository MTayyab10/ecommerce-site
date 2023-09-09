from products2.models import Product
from django.db import models
from shops1.models import TimeStampModel
from delivery_address4.models import DeliveryAddress
from shortuuid.django_fields import ShortUUIDField
from django.contrib.auth import get_user_model
User = get_user_model()


# Create Order Model Class
class Order(TimeStampModel):
    class OrderStatus(models.TextChoices):
        not_processed = 'not_processed'
        processed = 'processed'
        shipping = 'shipped'
        delivered = 'delivered'
        cancelled = 'cancelled'

    status = models.CharField(
        max_length=50, choices=OrderStatus.choices, default=OrderStatus.not_processed)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Unique Order Id of 11 digits
    unique_id = ShortUUIDField(unique=True, length=13, alphabet="0123456789", editable=False)

    # very big id almost 37 digits
    # uuid = models.UUIDField(default=uuid.uuid4, unique=True, db_index=True, editable=False)

    # Save here all Order price info
    sub_total = models.DecimalField(max_digits=7, decimal_places=1)
    delivery_fee = models.DecimalField(max_digits=7, decimal_places=1)
    # service_fee = models.DecimalField(max_digits=7, decimal_places=1)
    total_amount = models.DecimalField(max_digits=9, decimal_places=1)

    # delivery address for order
    address = models.ForeignKey(DeliveryAddress, on_delete=models.SET_NULL, null=True, blank=True)

    # we have already delivery_address with ForeignKey.
    # even after creating Order if user delete his delivery addr
    # we should display his delivery info on SpecificOrderDetail.js
    # so just add name, mobile, city & addr while creating order

    name = models.CharField(max_length=255, blank=False, null=False)
    delivery_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    mobile = models.CharField(max_length=11)

    def __str__(self):
        return f"Order Id {self.id}"


    # Order items category, name & qty in Order
    # Shop/Sell detail of order
    # Show at AdminPanel/API - shop_detail & order_item_detail

    @property
    def shop_detail(self):
        order_items = self.orderitem_set.all()
        shop = [shop.product.shop_owned.name for shop in order_items]
        return shop

    @property
    def product_detail(self):
        order_items = self.orderitem_set.all()
        product = [item.product.name for item in order_items]
        return product

    @property
    def order_item_details(self):
        order_items = self.orderitem_set.all()

        shop = [shop.product.shop_owned.name for shop in order_items]
        ctgry = [item.product.category.name for item in order_items]
        items = str([item.product.name for item in order_items])
        qty = [item.quantity for item in order_items]
        price = [item.product.price for item in order_items]

        return f"Shop: {shop} Ctgry: {ctgry} Name: {items} Qty: {qty} Price: {price}"


# OrderItems model
class OrderItem(TimeStampModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)

    # Later if product's name/price change then in Order & OrderItems
    # should not change basic info, Note: product can't be delete
    name = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=5, decimal_places=1)
    quantity = models.IntegerField(default=0, null=True, blank=True)


    def __str__(self):
        return self.product.name

    @property
    def order_item_details(self):
        # order_items = self.order.order_item_details
        order_items = self.order.order_item_details
        return order_items  # f"Ctgry {ctgry}  Name: {items} Qty: {qty} Price {price}"

    @property
    def order_items(self):
        return self.order


# CancelOrder model (user can cancel order)

class CancelOrder(TimeStampModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    reason = models.CharField(max_length=300)
    comment = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.reason}"




