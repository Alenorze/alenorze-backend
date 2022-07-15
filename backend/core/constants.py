from decimal import Decimal

from model_utils import Choices


COUNTRY_DATA = {
    'GB': {
        'currency': 'GBP',
        'rate': Decimal(0.80),
        'vat': 0.20,
    },
    'NO': {
        'currency': 'NOK',
        'rate': Decimal(9.44),
        'vat': 0.20,
    },
}

STATUS = Choices(
    ('PENDING', 'Pending'),
    ('PAYEMENT_ACCEPTED', 'Payment accepted'),
    ('PROCESSING', 'Processing'),
    ('CONFIRMED', 'Confirmed'),
    ('SHIPPED', 'Shipped'),
    ('DELIVERED', 'Delivered'),
    ('REFUNDED', 'Refunded'),
    ('CANCELED', 'Canceled'),
)

SHIPPING_METHODS = Choices(
    ('FREE_SHIPPING', 'Royal Mail 48h Gold Standard'),
    ('PAID_SHIPPING', 'Royal Mail 24h Platinum Standard'),
)

PAYMENT_OPTIONS = Choices(
    ('PAY_LATER', '30 day invoice (Powered by Two)'),
    ('PAY_NOW', 'Credit card'),
)

SHOP_KEY = 'SHOP_ID'
CART_KEY = 'CART_ID'
CURRENCY_KEY = 'CURRENCY'
