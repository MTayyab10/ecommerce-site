from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListShopsView, ListCategoryView
from rest_framework.authtoken import views

# app_name = 'shops1'

# router = DefaultRouter()
# router.register('category_api', CategoryViewSet, basename='category')

# router = DefaultRouter()
# router.register('shops_api', ShopViewSet, basename="shops")

"""If we include router.urls then need to add
auth token just now viewing without """

urlpatterns = [

    path('categories', ListCategoryView.as_view()),
    path('shops', ListShopsView.as_view()),

    # path('shops/', include(router.urls)),
    # path('shops/', ShopViewSet.as_view({'get': 'list'})),
]
