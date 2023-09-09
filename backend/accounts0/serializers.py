from djoser.serializers import UserCreateSerializer
from djoser import utils
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.conf import settings
from djoser import utils
from djoser.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = User

        # for all fields permissions
        # fields = '__all__'

        fields = ('id', 'email',
                  'username',
                  # 'first_name', 'last_name',
                  'password', 'last_login',
                  'date_joined',
                  'is_active', 'is_superuser'
                  # 'last_login'
                  )

        def update(self, instance, validated_data):
            email_field = get_user_email_field_name(User)
            if settings.SEND_ACTIVATION_EMAIL and email_field in validated_data:
                instance_email = get_user_email(instance)
                if instance_email != validated_data[email_field]:
                    instance.is_active = False
                    instance.save(update_fields=["is_active"])
            return super().update(instance, validated_data)
