#!/bin/bash

source /home/ubuntu/.bashrc
workon simvis
python /home/ubuntu/simvis/manage.py collectstatic
