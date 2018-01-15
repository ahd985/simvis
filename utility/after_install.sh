#!/bin/bash

source /home/ubuntu/.profile
python /home/ubuntu/simvis/manage.py collectstatic --clear --noinput

sudo systemctl restart nginx
