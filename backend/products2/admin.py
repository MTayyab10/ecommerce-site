from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Product


class ProductAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'category',
                    # 'category_link', 'shop_link',
                    'new', 'quantity',
                    'created_date', # 'updated_date',
                    'price', 'discount',
                    # 'discount_price',
                    # 'discount_percent',
                    )

    list_filter = ('shop_owned', 'new')
    # list_editable = ('category', 'price')

    list_display_links = ('id', 'name', 'category')

    # @staticmethod
    # def shop_link(obj):
    #     return mark_safe('<a href="{}">{}</a>'.format(
    #         reverse("admin:shops2_shop_change", args=(obj.shop_owned.pk,)),
    #         obj.shop_owned.name
    #     ))

    # @staticmethod
    # def category_link(obj):
    #     return mark_safe('<a href="{}">{}</a>'.format(
    #         reverse("admin:shops2_category_change", args=(obj.category.pk,)),
    #         obj.category.name
    #     ))

    # shop_link.short_description = 'shop_owned'
    # category_link.short_description = 'category'


admin.site.register(Product, ProductAdmin)
