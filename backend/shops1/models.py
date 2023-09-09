from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class TimeStampModel(models.Model):
    """ TimeStampModel for create & update time,
      initially 'created & updated` will have same time,
      if item changed/update something then update have different
     write for once, later can use in others models
    """
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# Every user is treated as Customer.


# class Customer(TimeStampModel):
#     # customer == user, but for better logic
#     # it's separated
#
#     user = models.OneToOneField(User, on_delete=models.SET_NULL,
#                                 null=True)
#     username = models.CharField(max_length=64)
#     email = models.EmailField(max_length=120)
#
#     def __str__(self):
#         return f"{self.user.username}"


# This Category model is used for shops & products to label category.


class Category(TimeStampModel):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name}"


class Shop(TimeStampModel):
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL,
                                 null=True, blank=True)

    category = models.ForeignKey(Category, on_delete=models.SET_NULL,
                                 null=True, blank=True)

    name = models.CharField(max_length=64, default="")

    # Img added through cloudianry
    img = models.ImageField(upload_to='shops1/images/shops')

    address = models.CharField(max_length=150, default="some random address")
    mobile = models.CharField(max_length=11, default="18519204393")

    # shops can have day-off, by default will be off
    working_day = models.BooleanField(default=False)
    business_time = models.CharField(max_length=150, default="From 10am to 12")
    delivery_time = models.CharField(max_length=70, default="Between 15 to 20")

    # if they can refund product or n
    refundable = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"

    # products of shop, display name and price

    # def shop_products(self):
    #     products = self.product_set.all()
    #     names = [product.name for product in products]
    #
    #     price = [product.discount_price if product.discount_price else product.price for product in products]
    #
    #     return f"Product : {names}, Price {price}"
    #
    # # total number of products of shop
    #
    # def total_shop_products(self):
    #     products = self.product_set.all()
    #     return products.count()


