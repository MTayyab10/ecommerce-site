from requests import Response
from requests import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product
from .serializers import ProductSerializer


# This view works perfectly.

class ListProductsView(APIView):

    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        sortBy = request.query_params.get('sortBy')

        if not (sortBy == 'created_date' or sortBy == 'price' or sortBy == 'sold' or sortBy == 'name'):
            sortBy = 'created_date'

        order = request.query_params.get('order')
        limit = request.query_params.get('limit')

        if not limit:
            limit = 6

        try:
            limit = int(limit)
        except:
            return Response(
                {'error': 'Limit must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        if limit <= 0:
            limit = 6

        if order == 'desc':
            sortBy = '-' + sortBy
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        elif order == 'asc':
            products = Product.objects.order_by(sortBy).all()[:int(limit)]
        else:
            products = Product.objects.order_by(sortBy).all()


        # context request will add link for img like http://localhost.....

        products = ProductSerializer(products, many=True, context={"request": request})

        if products:
            return Response({'products': products.data},
                            status=status.HTTP_200_OK)
        else:
            return Response(
                status=status.HTTP_404_NOT_FOUND)


# class ProductViewSet(viewsets.ModelViewSet):
#     """
#        This view have few issues.
#     """
#     serializer_class = ProductSerializer
#     queryset = Product.objects.all()
#
#     # Authenticate with token to use in other apps
#     authentication_classes = [TokenAuthentication]
#
#     # permission_classes = [IsAuthenticated]
#
#     # def get_permissions(self):
#     #     """Returns the permission based on the type of action"""
#     #
#     #     if self.action == "list":
#     #         return [permissions.AllowAny()]
#     #
#     #     return [permissions.IsAuthenticated()]

