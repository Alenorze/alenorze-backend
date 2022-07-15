from django.conf import settings

from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView

from constance import config

from addresses.models import Address
from businesses.models import Business, Webhooks, MerchantRedirectUrls
from carts.models import Cart, CartItem
from orders.models import Order, OrderItem
from users.models import User

from .utils import get_settings


class SettingViewSet(ViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def setting(self, request, allow_settings):
        if request.method == 'GET':
            # list all setting items
            return Response(data=get_settings(allow_settings))
        else:
            # change all allow setting items in allow_settings
            for key in request.data:
                if key in allow_settings and key in getattr(settings, 'CONSTANCE_CONFIG', {}):
                    value = request.data[key]
                    setattr(config, key, '' if value is None else value)
            return Response(data=get_settings(allow_settings))

    def create(self, request):
        """
        <p>update with POST:<code>{'Key': new_value}</code>
        """
        allow_settings = [key for key, options in getattr(settings, 'CONSTANCE_CONFIG', {}).items()]
        return self.setting(request, allow_settings)

    def list(self, request):
        """
        get all setting item
        """
        allow_settings = [key for key, options in getattr(settings, 'CONSTANCE_CONFIG', {}).items()]
        return self.setting(request, allow_settings)


class PurgeView(APIView):
    def delete(self, request):
        Address.objects.all().delete()
        Cart.objects.all().delete()
        CartItem.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()

        orders = Order.objects.all().delete()
        OrderItem.objects.all().delete()
        businesses = Business.objects.all().delete()
        Webhooks.objects.all().delete()
        MerchantRedirectUrls.objects.all().delete()

        return Response(
            status=status.HTTP_200_OK,
            data={"message": "Purged!"},
        )
