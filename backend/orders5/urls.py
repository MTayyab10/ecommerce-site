from django.urls import path
from .views import GetOrdersView, GetSpecificOrderView, CreateOrderView
    # GetTotalPriceView

urlpatterns = [

    # path('get-total-price', GetTotalPriceView.as_view()),

    path('create-order', CreateOrderView.as_view()),

    # Get orders after created successfully.

    path('get-orders', GetOrdersView.as_view()),
    path('get-order/<int:order_id>', GetSpecificOrderView.as_view()),
]
