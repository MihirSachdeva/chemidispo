import os
import json

from bugphile_app.models import *


def script():
    f = open(os.path.join(os.getcwd(), 'data', 'categories.json'))
    categories = json.load(f)

    for category in categories:
        category_obj = Category(
            name=category['name'],
            code=category['code']
        )
        category_obj.save()
