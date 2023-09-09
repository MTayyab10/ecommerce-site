from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Shop, Category


# class CustomerAdmin(admin.ModelAdmin):
#     list_display = ('user', 'id',
#                     # 'name',
#                     'email',
#                     'created_date', 'updated_date',
#                     # 'shop_names', 'shop_ctgry',
#                     # 'total_shops'
#                     )
#
#     list_filter = ('user', 'id',)
#
#     search_fields = ('user', 'id',)
#
#
# admin.site.register(Customer, CustomerAdmin)


class CategoryAdmin(admin.ModelAdmin):

    list_display = ('name', 'id',
                    'created_date',
                    # 'updated_date',
                    )
    # list_editable = ('name',)


admin.site.register(Category, CategoryAdmin)


class ShopAdmin(admin.ModelAdmin):

    list_display = (  # 'added_by',
                    'name',
                    'category',  # 'category_link',
                    # 'working_day',
                    'mobile',  # 'address',
                    'created_date', 'updated_date',

                    # 'shop_products', 'total_shop_products'
                    )

    list_display_links = ('name',)

    # search with below
    search_fields = ('name', 'added_by', 'mobile')

    list_per_page = 25

    list_filter = ('name', 'category')

    # @staticmethod
    # def category_link(obj):
    #     return mark_safe('<a href="{}">{}</a>'.format(
    #         reverse("admin:shops2_category_change", args=(obj.category.pk,)),
    #         obj.category.name
    #     ))

    # category_link.short_description = 'category'


admin.site.register(Shop, ShopAdmin)

