import json

from django.http import HttpResponse
from django.shortcuts import render_to_response

from .forms import UploadFileForm
from .data_ingest import read_file

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

    return render_to_response('pages/draw2.html', {"form": form})


def data_upload(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            data = read_file(form.cleaned_data['file'])

            return HttpResponse(
                json.dumps({"data": data[:MAX_DATA_ROWS]}),
                content_type="application/json"
            )
    else:
        # TODO - return error
        pass
