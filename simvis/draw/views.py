import json
import sys
import traceback

from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import JsonResponse

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
                        if 'levelDataIndex' in condition:
                            level_index = condition.pop('levelDataIndex')
                            level_span = condition.get('levelDataSpan', 1)
                            condition['level_data'] = list(data[level_index:level_index+level_span].values)
                        if 'colorDataIndex' in condition:
                            color_index = condition.pop('colorDataIndex')
                            color_span = condition.get('colorDataSpan', 1)
                            condition['color_data'] = list(data[color_index:color_index+color_span].values)
                        if 'dataIndex' in condition:
                            data_index = condition.pop('dataIndex')
                            data_span = condition.get('dataSpan', 1)
                            condition['data'] = list(data[data_index:data_index+data_span].values)

                ssv_model = SSV.from_json(model)

                return render_to_response('pages/ssv.html', {"ssv": ssv_model.render_model()})

    else:
        # TODO - return error
        pass

def validate_model(request):
    response = {}

    if request.session.get('data'):
        try:
            data = pd.read_json(request.session.get('data'))
            # Swap any dataIndex or xSeriesIndex with actual data
            x_series_index = model.pop('xSeriesIndex')
            model['x_series'] = list(data[x_series_index].values)
            for element in model['elements']:
                for condition in element['conditions']:
                    if 'levelDataIndex' in condition:
                        level_index = condition.pop('levelDataIndex')
                        level_span = condition.get('levelDataSpan', 1)
                        condition['level_data'] = list(data[level_index:level_index + level_span].values)
                    if 'colorDataIndex' in condition:
                        color_index = condition.pop('colorDataIndex')
                        color_span = condition.get('colorDataSpan', 1)
                        condition['color_data'] = list(data[color_index:color_index + color_span].values)
                    if 'dataIndex' in condition:
                        data_index = condition.pop('dataIndex')
                        data_span = condition.get('dataSpan', 1)
                        condition['data'] = list(data[data_index:data_index + data_span].values)

                    print("XXX")
                    print("XXX")
                    print(condition)
                    print("XXX")
                    print("XXX")



            ssv_model = SSV.from_json(model)
            response['success'] = True
        except:
            tb = traceback.format_exc()
            response['success'] = False
            response['message'] = str(tb)
    else:
        response['success'] = False
        response['message'] = 'Error: Lack of model data provided'

    return JsonResponse(response)
