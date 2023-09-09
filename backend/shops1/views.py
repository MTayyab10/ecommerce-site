from django.contrib.sites import requests
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from requests import Response
from rest_framework.response import Response
from rest_framework import status
from .serializers import CategorySerializer, ShopSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import Category, Shop


# class CategoryViewSet(viewsets.ModelViewSet):
#     """
#      A simple ViewSet for viewing accounts.
#     """
#     serializer_class = CategorySerializer
#     queryset = Category.objects.all()
#
#     # Authenticate with token to use in other apps'
#     # authentication_classes = [TokenAuthentication]
#
#     # permission_classes = [IsAuthenticated]
#
#     def get_permissions(self):
#         """Returns the permission based on the type of action"""
#
#         if self.action == "list":
#             return [permissions.AllowAny()]
#
#         return [permissions.IsAuthenticated()]

class ListCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        categories = Category.objects.all()

        category_serializer = CategorySerializer(categories, many=True)

        if category_serializer:
            return Response(
                {'categories': category_serializer.data},
                status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)


class ListShopsView(APIView):
    """
    This view works perfectly.
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):

        shops = Shop.objects.all()

        # context will add link for img like http://localhost.....
        # If not add then in development/production need to add
        # complete address e.g https://maifast.com

        shops = ShopSerializer(shops, many=True, context={"request": request})

        if shops:
            return Response({'shops': shops.data},
                            status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

# class ShopViewSet(viewsets.ModelViewSet):
#     """
#      A simple ViewSet for viewing accounts.
#     """
#     serializer_class = ShopSerializer
#     queryset = Shop.objects.all()
#
#     # Authenticate with token to use in other apps'
#     # authentication_classes = [TokenAuthentication]
#
#     # permission_classes = [IsAuthenticated]
#
#     def get_permissions(self):
#         """Returns the permission based on the type of action"""
#
#         if self.action == "list":
#             return [permissions.AllowAny()]
#
#         return [permissions.IsAuthenticated()]
