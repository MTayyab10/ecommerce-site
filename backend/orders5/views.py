from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from products2.models import Product
from cart3.models import Cart, CartItem
from delivery_address4.models import DeliveryAddress
from .models import Order, OrderItem, CancelOrder
from .serializers import OrderSerializer, OrderItemSerializer
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage

User = get_user_model()


# Create Order - (total price, order items etx)

class CreateOrderView(APIView):

    # Get total price (sub-total, delivery & service fee)
    def get(self, request, format=None):
        user = self.request.user

        try:
            # get user cart
            cart = Cart.objects.get(user=user)

            # check cart items
            cart_items = CartItem.objects.filter(cart=cart)

            # our all total order cost

            sub_total = 0.0
            delivery_fee = 0.0
            # service_fee = 0.0
            total_amount = 0.0

            for cart_item in cart_items:

                # if product have discount
                if cart_item.product.discount:
                    price = cart_item.product.price - cart_item.product.discount
                    sub_total += float(price) * float(cart_item.quantity)

                else:
                    sub_total += (float(cart_item.product.price)
                                  * float(cart_item.quantity))

            # just can decide later how much should charge delivery fee

            if 2000 < sub_total < 4000:
                delivery_fee += 200
            elif 4000 < sub_total < 6000:
                delivery_fee += 300
            else:
                delivery_fee += 100

            # just can decide later how much should charge Service fee

            # if 2000 < sub_total < 4000:
            #     service_fee += 100
            # elif 4000 < sub_total < 6000:
            #     service_fee += 50
            # else:
            #     service_fee += 0

            # Actual Total Amount for order
            total_amount += sub_total + delivery_fee  # + service_fee

            return Response(
                {
                    'sub_total': f'{sub_total:.1f}',
                    'delivery_fee': f'{delivery_fee:.1f}',
                    # 'service_fee': f'{service_fee:.1f}',
                    'total_amount': f'{total_amount:.1f}',
                }, status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving order total price.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # Create complete order with items & price, delivery info
    def post(self, request, format=None):

        user = self.request.user
        data = self.request.data

        # full_name = data['full_name']
        # address = data['address']
        # city = data['city']
        # mobile = data['mobile']

        # first get user cart
        cart = Cart.objects.get(user=user)

        # Check whether user has items in their cart or not

        items = CartItem.objects.filter(cart=cart).exists()
        if not items:
            return Response(
                {"error": "You don't have items in cart, first add."},
                status=status.HTTP_404_NOT_FOUND
            )

        # get cart items
        cart_items = CartItem.objects.filter(cart=cart)

        # Check if there is enough quantity of product in stock

        for cart_item in cart_items:
            product_id = Product.objects.filter(id=cart_item.product.id).exists()

            if not product_id:
                return Response(
                    {"error": "A product ID does not exist."},
                    status=status.HTTP_404_NOT_FOUND
                )

            if int(cart_item.quantity) > int(cart_item.product.quantity):
                return Response(
                    {"error": "Not enough items in stock."},
                    status=status.HTTP_200_OK
                )

        # Calculate total cost for items (sub-total)
        sub_total = 0

        # update our total order cost

        delivery_fee = 0.0
        # service_fee = 0.0
        total_amount = 0.0

        # Get sub-total
        for cart_item in cart_items:
            if cart_item.product.discount:
                price = cart_item.product.price - cart_item.product.discount
                sub_total += float(price) * float(cart_item.quantity)

            else:
                sub_total += (float(cart_item.product.price) * float(cart_item.quantity))

        # just can decide later how much should charge delivery fee

        # Get delivery fee
        if 2000 < sub_total < 4000:
            delivery_fee += 200
        elif 4000 < sub_total < 6000:
            delivery_fee += 300
        else:
            delivery_fee += 100

        # just can decide later how much should charge Service fee
        # if 2000 < sub_total < 4000:
        #     service_fee += 100
        # elif 4000 < sub_total < 6000:
        #     service_fee += 50
        # else:
        #     service_fee += 0

        # All Total Amount
        total_amount += sub_total + delivery_fee  # + service_fee

        print("Sub-total amount is: ", sub_total)
        print("Total amount is: ", total_amount)

        # Get delivery_address
        # If user don't have addr/active addr then show this error

        try:
            # If delivery address doesn't exist
            if not DeliveryAddress.objects.filter(user=user).exists():
                print("Delivery address doesn't exist.")
                return Response({"error": "Please add delivery address."},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            delivery_address = DeliveryAddress.objects.get(
                user=user,
                # name=name,
                # city=city,
                # mobile=mobile,
                addr_status=True)

        except DeliveryAddress.DoesNotExist:

            print("Delivery address is not selected.")
            return Response({"error": "Please select delivery address."},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # we have already delivery_address with ForeignKey.
        # even after creating Order if user delete his delivery addr
        # we should display his delivery info on SpecificOrderDetail.js
        # so just add name, mobile, city & addr while creating order

        # Create Order

        try:
            order = Order.objects.create(
                user=user,

                # save order price info
                sub_total=sub_total,
                delivery_fee=delivery_fee,
                # service_fee=service_fee,
                total_amount=total_amount,

                # delivery addr with ForeignKey
                address=delivery_address,

                name=delivery_address.name,
                city=delivery_address.city,
                delivery_address=delivery_address.address,
                mobile=delivery_address.mobile,
            )
            print("Order Id: ", order.id)
            print("Order has been created, successfully.")
            print("After creating order:", order.address)

            # after creating order updates product's qty
            for cart_item in cart_items:
                # Get product object to update
                update_product = Product.objects.get(id=cart_item.product.id)

                # Find quantity after purchase
                quantity = int(update_product.quantity) - int(cart_item.quantity)

                # Update the product
                Product.objects.filter(id=cart_item.product.id).update(
                    quantity=quantity
                )

            # After creating Order send Email to user

            # send_mail(
            #     'Order created successfully',  # subject
            #     f'Order Id: {order.unique_id} '  # msg
            #     f"Order price: {order.total_amount}"
            #     f'Order date: {order.created_date}'
            #     f'Order status: {order.status}',
            #
            #     'admin@maifast.com',  # sent from
            #     [f"{request.user.email}", 'admin@maifast.com'],
            #     # ['mt800045@gmail.com'],  # to
            #     fail_silently=False,
            # )
            # print("Email (after creating order) has been sent too.")

        except:
            print("Failed to create the order.")
            return Response(
                {"error": "Failed to create the order."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Create OrderItems

        for cart_item in cart_items:

            # First calculate here price let suppose if a product have
            # discount so price will reduce if we add cart_item.product.price
            # then this will just add product price not discounted price

            # Try to display right price here
            price = 0.0
            if cart_item.product.discount_price:
                price = cart_item.product.price - cart_item.product.discount
            else:
                price = cart_item.product.price

            try:
                # Get the product instance
                product = Product.objects.get(id=cart_item.product.id)

                # print("Product in OrderItem: ", product)

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    name=product.name,
                    # price=cart_item.product.price,
                    price=price,
                    quantity=cart_item.quantity
                )
                print("CartItem quantity is:", cart_item.quantity)
                print("OrderItem has been created too.")

                # return Response(
                #     {"success": "OrderItem Created too."},
                #     status=status.HTTP_200_OK
                # )

            except:

                print("Order created, but failed to create OrderItem.")
                return Response(
                    {"error": "Order created, but failed to create OrderItem."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        # Empty/Delete cart after creating Order & OrderItem

        try:
            # Empty the Cart
            CartItem.objects.filter(cart=cart).delete()

            # Update cart to have no items
            Cart.objects.filter(user=user).update(total_items=0)

        except:
            return Response(
                {"error": "Order created, but failed to clear CartItem."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


        # After creating Order send Email to user

        # simple few lines for sending user email about order

        # Later: also can send order items to user email
        # BUT now only sending some info (see above few lines)

        # order_items = OrderItem.objects.filter(order=order)

        # items_for_email = ""
        # for order_item in order_items:
        #     print("order_item is: ", order_item)
        #     items_for_email += order_item.name + " "
        #
        # print("Items for email: ", items_for_email)

        # We can use send_email() or EmailMessage() here
        # using email message for convenience

        # email = EmailMessage('Order details!', # subject
        #                      # items_for_email,
        #                      email_body, # msg
        #                      to=[f"{user.email}",
        #                          'admin@maifast.com',
        #                          ])
        #
        # # this is necessary because it tells that it's a html
        # email.content_subtype = "html"
        #
        # # by default backend/settings.py will send email
        # email.send()

        # send_mail(
        #     'Order created successfully',  # subject
        #     f'<h3> Heading Order Id: {order.unique_id} </h3>'  # msg

        #     f'<strong> Order status: {order.status} </strong>',
        # 'admin@maifast.com',  # sent from
        # [f"{request.user.email}", 'admin@maifast.com'], # to
        # connection='tayyabm10@hotmail.com',
        # fail_silently=False,
        # )

        # print("Email has been sent too.")

        try:

            email_body = """\
                      <html>
                        <head> </head>

                        <body class="bg-red-100">
                        <div class="container">

                      <h4 class="my-6 w-16"
                        style="color: #2d4ce3;
                        font-weight: 600 !important;
                        /*vertical-align: baseline;*/
                        font-size: 26px;
                        margin: 20px 0 0 0; "
                    >
                    <a style="text-decoration: none"
                    href="https://www.maifast.com">
                                MaiFast
                    </a>
                    </h4>

              <div class="space-y-4 mb-6">
                <h2 class="text-4xl fw-800">Thanks for your order, %s</h1>
                <p>The estimated delivery time for your order is 15 minutes.</p>

              </div>
              <div class="card rounded-3xl px-4 py-8 p-lg-10 mb-6">
                <h3 class="text-center">Order info</h3>

                <h4>Order Id: %s</h4>
                          <h4>Order total amount: Pkr %s</h4>
                          <h4>Order date: %s</h4>

                          <h3>Delivery info</h3>
                          <h4>%s %s %s </h4>
              </div>
            </div>
                          <a href="https://www.maifast.com/my_orders"
                              style="color: #ffffff; font-size: 16px; 
                              font-family: Helvetica, Arial, sans-serif;
                              text-decoration: none; border-radius: 9999px;
                              line-height: 20px; display: block; 
                              font-weight: normal;
                              white-space: nowrap;
                              background-color: #3a51c4; padding: 8px 24px;
                              border: 1px solid #3a51c4;">
                              More order info
                              </a>

                          <hr />            

                            <h5> If you have any questions, or need help
                                   <a href="https://www.maifast.com/help" 
                                   style="color: #1f45f5"> contact us </a>
                                    here or call us on 03276413565
                            </h5>

                            <h5>The MaiFast Team </h5>

                        </body>

                      </html>
                      """ % (user.username.title(), order.unique_id,
                             order.total_amount, order.created_date,
                             order.address.name, order.address.mobile,
                             order.address.address,
                             )

            email = EmailMessage('Order details!',  # subject
                             # items_for_email,
                             email_body,  # msg
                             to=[f"{user.email}",
                                 'admin@maifast.com',
                                 ])

             # this is necessary because it tells that it's a html
            email.content_subtype = "html"

             # by default backend/settings.py will send email
            email.send()

        except:
            return Response(
                {"error": "Order created, but failed to send email."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


        return Response(
            {"success": "Order & OrderItem was created. successfully."},
            status=status.HTTP_200_OK
        )

    # For more info about Create Order
    # github.com/MTayyab10/shop_time/blob/main/backend/payment/views.py


# Get all Orders & OrderItems view

class GetOrdersView(APIView):

    def get(self, request, format=None):
        user = self.request.user

        # Retrieve user's orders & order them by the date
        orders = Order.objects.filter(user=user).order_by('-created_date')
        order_serializer = OrderSerializer(orders, many=True)

        # Retrieve OrderItems

        order_items = OrderItem.objects.filter(order__user=user)

        order_items_serializer = OrderItemSerializer(order_items, many=True, context={"request": request})

        if order_serializer:
            return Response(
                {'orders': order_serializer.data,
                 'order_items': order_items_serializer.data},
                status=status.HTTP_200_OK)

        return Response({"error": "orders not found for user."},
                        status=status.HTTP_404_NOT_FOUND)


# This one works without serializer for more info see this code
# github.com/MTayyab10/shop_time/blob/main/backend/orders/views.py


# Get & Put specific/one Order&OrderItem
# Order detail & Cancel order
class GetSpecificOrderView(APIView):

    # get detail of specific order
    def get(self, request, order_id, format=None):

        user = self.request.user

        try:
            order = Order.objects.filter(user=user, id=order_id).exists()
            if order:

                # Retrieve user's orders & order them by the date
                specific_order = Order.objects.get(user=user, id=order_id)

                # as we have only one so can't iterate so no
                # need to add many=True as we did in others
                order_serializer = OrderSerializer(specific_order)

                # Retrieve OrderItems
                order_items = OrderItem.objects.filter(order=specific_order)
                order_items_serializer = OrderItemSerializer(order_items, many=True,
                                                             context={"request": request})

                if order_serializer:
                    return Response(
                        {'specific_order': order_serializer.data,
                         'specific_order_items': order_items_serializer.data},
                        status=status.HTTP_200_OK)

            else:
                return Response({"error": "Order with this Id doesn't exist."},
                                status=status.HTTP_404_NOT_FOUND)

        except:

            return Response(
                {"error": "Something went wrong when retrieving order detail."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # cancel(update) order status if user cancelled order
    def put(self, request, order_id, format=None):

        user = self.request.user

        try:
            order_exist = Order.objects.filter(user=user, id=order_id).exists()

            # first check Order with id exist or not
            if order_exist:

                # if order exist then check status
                order = Order.objects.filter(id=order_id, status="not_processed")

                if not order:
                    return Response({"error": "Your order has other status."},
                                    status=status.HTTP_404_NOT_FOUND)

                # Retrieve user's orders & update order status
                Order.objects.filter(user=user, id=order_id).update(status="cancelled")

                return Response({"success": "Your order has been cancelled."},
                                status=status.HTTP_200_OK)

            else:
                return Response(
                    {"error": "Order with this Id doesn't exist."},
                    status=status.HTTP_404_NOT_FOUND)

        except:

            return Response(
                {"error": "Something went wrong when cancelling order."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Cancel Order using model

    def post(self, request, order_id, format=None):

        user = self.request.user
        data = self.request.data

        reason = data['reason']
        comment = data['comment']

        try:
            order_exist = Order.objects.filter(user=user, id=order_id).exists()

            # first check Order with id exist or not
            if order_exist:

                # if order exist then check status
                order = Order.objects.filter(id=order_id, status="not_processed")

                if not order:
                    return Response({"error": "Your order has other status."},
                                    status=status.HTTP_404_NOT_FOUND)

            else:
                return Response(
                    {"error": "Order with this Id doesn't exist."},
                    status=status.HTTP_404_NOT_FOUND)

        except:

            return Response(
                {"error": "Something went wrong when cancelling order."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            # get specific order
            order = Order.objects.get(id=order_id, user=user)

            # get reason & comment from user
            CancelOrder.objects.create(order=order, reason=reason, comment=comment)

            # Change order status too
            Order.objects.filter(id=order_id, user=user).update(status="cancelled")

            return Response(
                {"success": "Your Order has been cancelled."},
                status=status.HTTP_200_OK
            )

        except:
            return Response(
                {"error": "Order cancelled failed."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
