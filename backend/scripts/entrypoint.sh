#!/bin/sh

set -e

python manage.py collectstatic --noinput
python manage.py wait_for_db
python manage.py migrate
python manage.py loaddata criteria exam question

uwsgi --socket :9000 --workers=4 --master --enable-threads --module config.wsgi
