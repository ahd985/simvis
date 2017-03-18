# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views

urlpatterns = [
    # URL pattern for the main view
    url(
        regex=r'^$',
        view=views.draw_view2,
        name='draw2'
    ),
    url(
        regex=r'^data-upload$',
        view=views.data_upload,
        name='data_upload'
    ),
    url(
        regex=r'^ssv$',
        view=views.ssv,
        name='ssv'
    )
]
