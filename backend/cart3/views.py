from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from products2.models import Product
from products2.serializers import ProductSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


# Cart items

class GetItemsView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart, created = Cart.objects.get_or_create(user=user)
            cart_items = CartItem.objects.order_by('product').filter(cart=cart)

            result = []

            if CartItem.objects.filter(cart=cart).exists():
                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['quantity'] = cart_item.quantity
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product, context={"request": request})

                    item['product'] = product.data

                    result.append(item)
            return Response({'cart': result}, status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when retrieving cart items'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Add item to the cart (also create cart)

class AddItemView(APIView):

    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        # after adding item, it will also create cart

        cart, created = Cart.objects.get_or_create(user=user)

        try:
            product_id = int(data['product_id'])

        except:
            return Response(
                {'error': 'Product ID must be an integer.'},
                status=status.HTTP_404_NOT_FOUND)

        quantity = 1

        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND)

            product = Product.objects.get(id=product_id)

            cart = Cart.objects.get(user=user)

            if CartItem.objects.filter(cart=cart, product=product).exists():
                return Response(
                    {'error': 'Item is already in cart'},
                    status=status.HTTP_409_CONFLICT)

            if int(product.quantity) > 0:
                CartItem.objects.create(
                    product=product, cart=cart, quantity=quantity
                )

                if CartItem.objects.filter(cart=cart, product=product).exists():
                    # Update the total number of items in the cart
                    total_items = int(cart.total_items) + 1
                    Cart.objects.filter(user=user).update(
                        total_items=total_items
                    )

                cart_items = CartItem.objects.filter(cart=cart)

                result = []

                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['quantity'] = cart_item.quantity
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

                return Response(
                    {'cart': result},
                    status=status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {'error': 'Not enough of this item in stock'},
                    status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when adding item to cart'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Cart Total Price

class GetTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)

            total_cost = 0
            total_compare_cost = 0

            if cart_items.exists():
                for cart_item in cart_items:

                    # if product have discount then calculate like this

                    if cart_item.product.discount:
                        price = cart_item.product.price - cart_item.product.discount
                        total_cost += float(price) * float(cart_item.quantity)

                    else:
                        total_cost += (float(cart_item.product.price)
                                      * float(cart_item.quantity))

                total_cost = round(total_cost, 2)
                # total_compare_cost = round(total_compare_cost, 2)

            return Response({
                'total_cost': f'{total_cost:.1f}'},
                # 'total_compare_cost': total_compare_cost},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when retrieving total costs'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Total cart items e.g 3

class GetItemTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            total_items = cart.total_items
            print("Total items in cart views: ", total_items)

            return Response(
                {'total_items': total_items},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when getting total number of items'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Update the item quantity in Cart

class UpdateItemView(APIView):
    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        try:
            quantity = int(data['quantity'])
        except:
            return Response(
                {'error': 'Quantity value must be an integer.'},
                status=status.HTTP_404_NOT_FOUND)

        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND)

            product = Product.objects.get(id=product_id)

            cart = Cart.objects.get(user=user)

            if not CartItem.objects.filter(cart=cart, product=product).exists():
                return Response(
                    {'error': 'This product is not in your cart'},
                    status=status.HTTP_404_NOT_FOUND)

            product_quantity = product.quantity

            if quantity <= product_quantity:
                CartItem.objects.filter(
                    product=product, cart=cart
                ).update(quantity=quantity)

                print("In car, product item has been updated.")

                cart_items = CartItem.objects.order_by(
                    'product').filter(cart=cart)

                result = []

                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['quantity'] = cart_item.quantity
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

                return Response({'cart': result}, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'error': 'Not enough of this item in stock'},
                    status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when updating cart item'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Remove the item from Cart

class RemoveItemView(APIView):
    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data['product_id'])
        except:
            return Response(
                {'error': 'Product ID must be an integer'},
                status=status.HTTP_404_NOT_FOUND)

        try:
            if not Product.objects.filter(id=product_id).exists():
                return Response(
                    {'error': 'This product does not exist'},
                    status=status.HTTP_404_NOT_FOUND)

            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)

            if not CartItem.objects.filter(cart=cart, product=product).exists():
                return Response(
                    {'error': 'This product is not in your cart.'},
                    status=status.HTTP_404_NOT_FOUND)

            CartItem.objects.filter(cart=cart, product=product).delete()

            if not CartItem.objects.filter(cart=cart, product=product).exists():
                # Update total items in cart
                total_items = int(cart.total_items) - 1
                Cart.objects.filter(user=user).update(total_items=total_items)

            cart_items = CartItem.objects.filter(cart=cart)

            result = []

            if CartItem.objects.filter(cart=cart).exists():
                for cart_item in cart_items:
                    item = {}

                    item['id'] = cart_item.id
                    item['quantity'] = cart_item.quantity
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)

                    item['product'] = product.data

                    result.append(item)

            return Response({'cart': result}, status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong when removing item'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EmptyCartView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)

            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'success': 'Cart is already empty'},
                    status=status.HTTP_200_OK)

            CartItem.objects.filter(cart=cart).delete()

            # Update cart to have no items
            Cart.objects.filter(user=user).update(total_items=0)

            return Response(
                {'success': 'Cart emptied successfully'},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Something went wrong emptying cart'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SynchCartView(APIView):

    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            cart_items = data['cart_items']

            for cart_item in cart_items:
                cart = Cart.objects.get(user=user)

                try:
                    product_id = int(cart_item['product_id'])
                except:
                    return Response(
                        {'error': 'Product ID must be an integer'},
                        status=status.HTTP_404_NOT_FOUND)

                if not Product.objects.filter(id=product_id).exists():
                    return Response(
                        {'error': 'Product with this ID does not exist'},
                        status=status.HTTP_404_NOT_FOUND)

                product = Product.objects.get(id=product_id)
                product_quantity = product.quantity

                if CartItem.objects.filter(cart=cart, product=product).exists():
                    # Updating of the cart item to user's cart
                    item = CartItem.objects.get(cart=cart, product=product)
                    quantity = item.quantity

                    try:
                        cart_item_quantity = int(cart_item['quantity'])
                    except:
                        cart_item_quantity = 1

                    # Check if local cart count plus the database cart count is less
                    # than or equal to product quantity
                    if (cart_item_quantity + int(product_quantity)) <= int(quantity):
                        updated_quantity = cart_item_count + int(quantity)
                        CartItem.objects.filter(
                            cart=cart, product=product
                        ).update(quantity=updated_quantity)
                else:
                    # Adding of the cart item to user's cart
                    try:
                        cart_item_count = int(cart_item['quantity'])
                    except:
                        cart_item_count = 1

                    if cart_item_count <= quantity:
                        CartItem.objects.create(
                            product=product, cart=cart, quantity=cart_item_count
                        )

                        if CartItem.objects.filter(cart=cart, product=product).exists():
                            # Update the total number of items in the cart
                            total_items = int(cart.total_items) + 1
                            Cart.objects.filter(user=user).update(
                                total_items=total_items
                            )
                            #
                            # wishlist = WishList.objects.get(user=user)
                            #
                            # if WishListItem.objects.filter(wishlist=wishlist, product=product).exists():
                            #     WishListItem.objects.filter(
                            #         wishlist=wishlist,
                            #         product=product
                            #     ).delete()

                            # if not WishListItem.objects.filter(wishlist=wishlist, product=product).exists():
                            #     total_items = int(wishlist.total_items) - 1
                            #     WishList.objects.filter(user=user).update(
                            #         total_items=total_items
                            #     )
            return Response(
                {'success': 'Cart Synchronized'},
                status=status.HTTP_201_CREATED)
        except:
            return Response(
                {'error': 'Something went wrong when synching cart'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
