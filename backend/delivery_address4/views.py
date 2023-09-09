from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DeliveryAddress
from django.contrib.auth import get_user_model

User = get_user_model()


# Get all delivery address & create new one (get & post method)
class DeliveryAddressView(APIView):

    # get all address
    def get(self, request):

        user = self.request.user

        try:
            # Retrieve the user's delivery address and order them
            # by the addr_status (as will have only one addr_status=True)
            delivery_addresses = DeliveryAddress.objects.filter(user=user).order_by('-addr_status')

            # This will be where we store the orders and
            # what we send back to the frontend
            result = []

            for address in delivery_addresses:
                # The address itself
                addr = {'user': address.user.username,
                        'id': address.id,
                        'name': address.name,
                        'address': address.address,
                        'city': address.city,
                        'mobile': address.mobile,
                        'addr_status': address.addr_status
                        }

                result.append(addr)

            return Response(
                {'delivery_addresses': result},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving delivery addresses.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # creat new address
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        name = data['name']
        address = data['address']
        city = data['city']
        mobile = data['mobile']
        addr_status = data['addr_status']

        try:
            exist_address = DeliveryAddress.objects.filter(
                user=user,
                name=name,
                address=address,
                city=city,
                mobile=mobile,
                # addr_status=addr_status
            ).exists()

            print("exist address", exist_address)
            if exist_address:

                return Response(
                    {"error": "This delivery address already exist."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            else:
                addr = DeliveryAddress.objects.create(
                    user=user,
                    name=name,
                    address=address,
                    city=city,
                    mobile=mobile,
                    addr_status=addr_status
                )

                print("Addr status after creating", addr.addr_status)

                # after creating address if addr_status is True
                # then for all other address addr_status should
                # be False

                if addr.addr_status:
                    DeliveryAddress.objects.filter(
                    user=user).\
                        exclude(id=addr.id)\
                        .update(addr_status=False)

                return Response(
                    {'success': "Delivery address created, successfully."},
                    status=status.HTTP_200_OK
                )

        except:
            return Response(
                {'error': "Delivery address created failed."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )



# Delivery address Update & Delete
class SpecificDeliveryAddressView(APIView):

    # Update delivery address (have an error while updating)
    def put(self, request, address_id, format=None):
        user = self.request.user
        data = self.request.data

        name = data['name']
        address = data['address']
        city = data['city']
        mobile = data['mobile']
        addr_status = data['addr_status']

        try:
            if not DeliveryAddress.objects.filter(id=address_id, user=user).exists():
                return Response(
                    {"error": "Delivery address with this ID doesn't exist."},
                    status=status.HTTP_404_NOT_FOUND)

            addr = DeliveryAddress.objects.get(id=address_id, user=user)
            print("Address is: ", addr)

            if addr:
                delivery_addr = DeliveryAddress.objects.filter(
                    user=user,
                    name=name,
                    address=address,
                    city=city,
                    mobile=mobile,
                    addr_status=addr_status
                )

                if delivery_addr.exists():

                    return Response(
                        {'error': "This delivery address already exist."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                else:

                    DeliveryAddress.objects.filter(
                        id=address_id, user=user).update(
                        user=user,
                        name=name,
                        address=address,
                        city=city,
                        mobile=mobile,
                        addr_status=addr_status
                    )

                    print("addr status is: ", addr.addr_status)

                    # after creating address if addr_status is True
                    # then for all other address addr_status should
                    # be False

                    if DeliveryAddress.objects.get(user=user, id=address_id).addr_status:
                        DeliveryAddress.objects.filter(
                            user=user). \
                            exclude(id=address_id) \
                            .update(addr_status=False)

                    return Response(
                        {'success': "Delivery address has been updated."},
                        status=status.HTTP_200_OK)

            else:
                return Response(
                    {"error": 'Something went wrong. Try again.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except:
            return Response(
                {'error': 'Something went wrong when updating delivery address.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    # Delete deliver address
    def delete(self, request, address_id, format=None):
        user = self.request.user

        try:
            address = DeliveryAddress.objects.filter(id=address_id, user=user)
            print("delivery addr: ", address, " Id", address_id)

            if address.exists():
                address.delete()

                return Response(
                    {'success': 'Successfully deleted delivery address.'},
                    status=status.HTTP_200_OK)

            else:
                return Response(
                    {"error": "Address with this ID doesn't exist."},
                    status=status.HTTP_404_NOT_FOUND)


        except:
            return Response(
                {'error': 'Failed to delete delivery address.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
