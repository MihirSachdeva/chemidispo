import os
import json
from bugphile_app.models import *


def script():
    f = open(os.path.join(os.getcwd(), 'data', 'all_chemicals.json'))
    chemicals = json.load(f)

    for chemical in chemicals:
        placards = chemical[0]['data_points'][2]['value']

        placard_list = []

        for placard in placards:
            placard, _ = Placard.objects.get_or_create(
                description=placard['alt'],
                link=placard['link']
            )
            placard_list.append(placard.id)

        chemical_obj = Chemical(
            name=chemical[0]['data_points'][0]['value'],
            cas_number=chemical[1]['data_points'][0]['value'],
            description=chemical[1]['data_points'][1]['value'],
            chemical_formula=chemical[0]['data_points'][1]['value'],
        )
        chemical_obj.save()

        chemical_obj.placard.set(placard_list)

        chemical_obj.save()

        msds_dict = [
            chemical[2],
            chemical[3],
        ]
        msds_string = json.dumps(msds_dict)

        msds_obj = Handling(
            chemical=chemical_obj,
            msds=msds_string,
        )

        msds_obj.save()
