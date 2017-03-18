import json
import sys

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
import pandas as pd

from .forms import UploadFileForm, ModelForm
from .data_ingest import read_file, summarize

# Temporary way to get SSV functionality
sys.path.append('/Users/Alex/Documents/Python Projects/ssv')
from ssv import SSV


MAX_DATA_ROWS = 10


def draw_view(request):
    form = UploadFileForm()

    with open('simvis/data/shape_icons.json') as f:
        shape_icons = json.load(f)

    return render_to_response('pages/draw.html', {"form": form})


def draw_view2(request):
    form = UploadFileForm()

    with open('simvis/data/shape_icons.json') as f:
        shape_icons = json.load(f)

    return render_to_response('pages/draw2.html', context_instance=RequestContext(request))


def data_upload(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            data = read_file(form.cleaned_data['file'])
            request.session['data'] = data.to_json(orient="values")
            data_summary = summarize(data)

            return HttpResponse(
                json.dumps({"data": data_summary[:MAX_DATA_ROWS]}),
                content_type="application/json"
            )
    else:
        # TODO - return error
        pass


def ssv(request):
    if request.method == 'POST':
        form = ModelForm(request.POST)
        if form.is_valid():
            model = json.loads(form.cleaned_data["model"])

            if request.session.get('data'):
                data = pd.read_json(request.session.get('data'))
                # Swap any dataIndex or xSeriesIndex with actual data
                x_series_index = model.pop('xSeriesIndex')
                model['x_series'] = list(data[x_series_index].values)
                for element in model['elements']:
                    for condition in element['conditions']:
                        data_index = condition.pop('dataIndex')
                        condition['data'] = list(data[data_index].values)

                ssv_model = SSV.from_json(model)

                return render_to_response('pages/ssv.html', {"ssv": ssv_model.render_model()})

    else:
        # TODO - return error
        pass
