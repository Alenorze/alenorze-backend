from decimal import Decimal

from django.conf import settings

from constance import config

from core.constants import COUNTRY_DATA
from shops.models import Shop


def convert_money(value, currency):
    rate = 1
    for cd in COUNTRY_DATA.values():
        if cd['currency'] == currency:
            rate = cd['rate']

    total = Decimal(value) * rate
    return f'{total:.2f}'


def get_current_shop():
    shop = Shop.objects.filter(id=config.SHOP).first()
    if not shop:
        shop = Shop.objects.filter().first()

    if not shop:
        shop = Shop.objects.create(name='Default Shop')

    return shop


def get_settings(allow_settings):
    setting_list = []

    for key, options in getattr(settings, 'CONSTANCE_CONFIG', {}).items():
        if key in allow_settings:
            default, help_text = options[0], options[1]
            data = {'key': key,
                    'default': default,
                    'help_text': help_text,
                    'value': getattr(config, key)}
            setting_list.append(data)

    return setting_list
