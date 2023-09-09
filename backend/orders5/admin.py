from django.contrib import admin
from .models import Order, OrderItem, CancelOrder


class OrderAdmin(admin.ModelAdmin):
    # def has_delete_permission(self, request, obj=None):
    #     return False

    list_display = ('id', # 'user',
                    'unique_id', 'status',
                    'sub_total',
                   # 'delivery_fee', 'service_fee',
                    'total_amount',
                    'shop_detail', 'product_detail',
                    'order_item_details',
                    # 'created_date', 'updated_date'
                    )
    list_display_links = ('id', 'unique_id', 'status')
    # list_filter = ('id', 'status', )

    # list_editable = ('status', )
    list_per_page = 25
    search_fields = ('unique_id', )


admin.site.register(Order, OrderAdmin)


class OrderItemAdmin(admin.ModelAdmin):
    # def has_delete_permission(self, request, obj=None):
    #     return False

    list_display = ('order', 'id', 'product', 'price',
                    # 'count',
                    'order_items', 'order_item_details'
                    )
    list_display_links = ('order', 'id', 'product', )
    list_per_page = 25


admin.site.register(OrderItem, OrderItemAdmin)


class CancelOrderAdmin(admin.ModelAdmin):

    list_display = ('order', 'reason', 'comment', )

    list_display_links = ('order', 'reason',)
    list_per_page = 25


admin.site.register(CancelOrder, CancelOrderAdmin)
