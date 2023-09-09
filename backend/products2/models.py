from django.db import models
from shops1.models import TimeStampModel,\
    Category, Shop


# Note if Products in OrderItem (for more info see orders5 models)
# then product can't be deleted but can change

class Product(TimeStampModel):

    # added_by = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    shop_owned = models.ForeignKey(Shop, on_delete=models.CASCADE,
                                   null=True, blank=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE,
                                 null=True, blank=True)

    name = models.CharField(max_length=64, default="My product")
    description = models.TextField(default='This is some description')

    # how much qty have of this product
    quantity = models.IntegerField(default=1)

    class Unit(models.TextChoices):
        KILOGRAM = "Kg", "Kilogram"
        LITRE = "L", "Litre"
        BOTTLE = 'Bottle', 'Bottle'
        GLASS = "Glass", 'Glass'
        PIECE = 'Piece', 'Piece'

    # unit of measure (UoM), e.g Kg, Litre
    unit = models.CharField(max_length=10, choices=Unit.choices, default="L")

    # just 1 img now, later can add 2/3 img to show at specific product page
    img = models.ImageField(upload_to='products2/images/products',
                            default="products2/images/products/carrots.jpg")
    price = models.DecimalField(max_digits=5, decimal_places=1, default=650.5)

    # To check if product is new/not
    new = models.BooleanField(default=False, null=True, blank=True)

    # Some Products can have Discount/Offers
    discount = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return self.name
        # return str(self.shop_owned)
        # return f"Ctgry: {self.category}, Name: {self.name}, Rs. [{str(self.price)}]"


    # Calculation for discount percent %
    @property
    def discount_percent(self):
        percent = 0
        if self.discount:
            percent = int((self.discount / self.price) * 100)
        return percent

    # Calculation for discounted_price
    @property
    def discount_price(self):
        price = 0
        if self.discount:
            price = (self.price - self.discount)
        return price

    # @staticmethod
    # def products_by_category(category):
    #     if category:
    #         products = Product.objects.filter(category__name=category)
    #     else:
    #         products = Product.objects.all()
    #     return products


