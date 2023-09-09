from django.contrib import admin
from .models import DeliveryAddress

class DeliveryAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'id', 'name',
                    'address', 'city', 'mobile')

    list_display_links = ('id', 'name', 'address')


admin.site.register(DeliveryAddress, DeliveryAddressAdmin)

