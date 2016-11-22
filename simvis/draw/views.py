import json

from django.http import HttpResponse
from django.shortcuts import render_to_response

def draw_view(request):
    with open('simvis/data/shape_icons.json') as f:
        shape_icons = json.load(f)

    return render_to_response('pages/draw.html', {"shape_icons": shape_icons})
