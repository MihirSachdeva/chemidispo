import os
import json
from bugphile_app.models import *


def script():
    f = open(os.path.join(os.getcwd(), 'data', 'chemicals_with_categories.json'))
    chemicals = json.load(f)

    for chemical in chemicals:
        chemical_obj = Chemical.objects.filter(name=chemical['name'])
        category_obj = Category.objects.filter(code=chemical['category_code'])

        if chemical_obj.exists():
            chemical_obj = chemical_obj[0]
            print(chemical_obj, chemical_obj.name, category_obj[0], category_obj[0].name)
            chemical_obj.category.add(category_obj[0])
            chemical_obj.save()
            # print(f"Added {chemical['category_code']}.{chemical['category']} to {chemical_obj.name}")
