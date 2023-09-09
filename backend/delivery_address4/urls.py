from django.urls import path
from .views import DeliveryAddressView, SpecificDeliveryAddressView

urlpatterns = [
    # get & post method
    path('delivery-address', DeliveryAddressView.as_view()),

    # put & delete method
    path('delivery-address/<int:address_id>', SpecificDeliveryAddressView.as_view())

]