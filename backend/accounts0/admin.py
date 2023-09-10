from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model()


# Header Name

admin.site.site_header = "Ecommerce Admin"

# Apps Ordering in DjangoAdmin


def app_resort(func):
    def inner(*args, **kwargs):
        app_list = func(*args, **kwargs)
        # Useful to discover your app & module list:
        # import pprint
        # pprint.pprint(app_list)

        app_sort_key = 'name'
        app_ordering = {
            "Authentication and Authorization": 0,
            "Accounts0": 1,
            "Shops1": 2,
            "Products2": 3,
            "Cart3": 4,
            "Delivery_Address4": 5,
            "Orders5": 6,
            "Auth Token": 7,

            # "Jobs8": 7,

        }

        resorted_app_list = sorted(app_list, key=lambda x: app_ordering[x[app_sort_key]] if x[
                                    app_sort_key] in app_ordering else 1000)
        model_sort_key = 'object_name'
        model_ordering = {
            "Customer": 1,
            "Category": 2,
            "Shop": 3,
            # "Product": 4,

            "Cart": 1,
            "CartItem": 2,

            "delivery_address": 1,
            "Order": 2,
            "OrderItem": 3,

            "Team": 1,
            "WorkForce": 2,
            "Location": 3,
            "Job": 4,
            "JobApplication": 5,
        }

        for app in resorted_app_list:
            app['models'].sort(
                key=lambda x: model_ordering[x[model_sort_key]] if x[model_sort_key] in model_ordering else 1000)
        return resorted_app_list

    return inner


admin.site.get_app_list = app_resort(admin.site.get_app_list)


# User Admin

class UserAdmin(admin.ModelAdmin):

    list_display = ('id', 'username',
                    'email', 'date_joined')
    list_display_links = ('id', 'username',)  # 'email', )

    # by email & username can do search
    search_fields = ('email', 'username')

    list_per_page = 25

    list_filter = ('is_superuser', 'is_active')


admin.site.register(User, UserAdmin)
