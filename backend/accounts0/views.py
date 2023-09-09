from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from djoser import signals, utils
from djoser.compat import get_user_email
from djoser.conf import settings

User = get_user_model()


class DeleteUserAccountView(APIView):
    """User can delete account in UserData.js"""

    def delete(self, request, format=None):
        user = self.request.user

        try:
            User.objects.filter(id=user.id).delete()

            return Response(
                {'success': 'Successfully deleted user account.'},
                status=status.HTTP_200_OK)
        except:
            return Response(
                {'error': 'Failed to delete user account'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Not send activation email after updating name

def perform_update(self, serializer, *args, **kwargs):
    super().perform_update(serializer, *args, **kwargs)
    user = serializer.instance
    signals.user_updated.send(
        sender=self.__class__, user=user, request=self.request
    )

    # should we send activation email after update?
    if settings.SEND_ACTIVATION_EMAIL and not user.is_active:
        context = {"user": user}
        to = [get_user_email(user)]
        settings.EMAIL.activation(self.request, context).send(to)
