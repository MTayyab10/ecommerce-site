from django.urls import path
from .views import DeleteUserAccountView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('delete-account/', DeleteUserAccountView.as_view()),
]
