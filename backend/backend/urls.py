"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import to include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [

    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    # for social auth like google
    path('auth/', include('djoser.social.urls')),

    path('api/auth/', include('accounts0.urls')),

    path('api/shop/', include('shops1.urls')),
    path('api/product/', include('products2.urls')),

    path('api/cart/', include('cart3.urls')),
    path('api/delivery/', include('delivery_address4.urls')),
    path('api/order/', include('orders5.urls')),

    path('admin/', admin.site.urls),
]


# for static files like pics, css etc..
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# for connecting with frontend React.js
urlpatterns += [re_path(r".*", TemplateView.as_view(template_name='index.html'))]
