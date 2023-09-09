from django.contrib import admin
from .models import Cart, CartItem


class CartAdmin(admin.ModelAdmin):

    list_display = ('user', 'id', 'total_items')


class CartItemAdmin(admin.ModelAdmin):

    list_display = ('cart', 'product', 'quantity')


admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
