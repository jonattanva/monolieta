#! /bin/bash

psql \
    -v ON_ERROR_STOP=1 \
    --host "$POSTGRES_HOSTNAME" \
    --username "$POSTGRES_USERNAME" \
    --dbname "$POSTGRES_DATABASE" \
    -f $1