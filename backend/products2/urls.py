from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListProductsView
from rest_framework.authtoken import views

# app_name = 'products2'

# router = DefaultRouter()
# router.register('', ProductViewSet, basename='product')

urlpatterns = [

    # path('products', include(router.urls)),
    path('products', ListProductsView.as_view()),

    # path('products', ProductViewSet.as_view({'get': 'list'}))

]
