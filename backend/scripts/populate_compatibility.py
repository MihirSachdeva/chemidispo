import os
import json
from django.db.models import Q

from bugphile_app.models import *


def script():
    f = open(os.path.join(os.getcwd(), 'data', 'compatibility.json'))
    compatibilities = json.load(f)

    for c_1, c_1_compatibilities in compatibilities.items():
        c_1_obj = Category.objects.filter(code=c_1)[0]
        for c_2, c_1_2_compatibility in c_1_compatibilities.items():
            c_2_obj = Category.objects.filter(code=c_2)[0]
            category_12 = Q(
                category_1=c_1_obj,
                category_2=c_2_obj,
            )
            category_21 = Q(
                category_1=c_2_obj,
                category_2=c_1_obj,
            )
            category_query = category_12 | category_21

            compatibility_exists = Compatibility.objects.filter(category_query).exists()

            if not compatibility_exists:
                compatibility_obj = Compatibility(
                    category_1=c_1_obj,
                    category_2=c_2_obj,
                    report=c_1_2_compatibility
                )
                compatibility_obj.save()
                print(f"Created compatibility: {c_1_obj.id}.{c_1_obj.name} with {c_2_obj.id}.{c_2_obj.name}")
