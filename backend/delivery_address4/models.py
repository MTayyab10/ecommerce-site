from django.db import models
from shops1.models import TimeStampModel
from django.contrib.auth import get_user_model
User = get_user_model()


# Delivery address for orders

class DeliveryAddress(TimeStampModel):
    # address for deliver order

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=255, blank=False, null=False)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255, default="Tatlay Aali")
    mobile = models.CharField(max_length=11)

    # status pick/choose one addr from more addresses

    addr_status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}, {self.mobile}"
