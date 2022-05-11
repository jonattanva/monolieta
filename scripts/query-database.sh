#! /bin/bash

psql \
    -v ON_ERROR_STOP=1 \
    --host "$POSTGRES_HOSTNAME" \
    --port "$POSTGRES_PORT" \
    --username "$POSTGRES_USER" \
    --dbname "$POSTGRES_DATABASE" \
    --file $1