#! /bin/bash

createdb \
    --host "$POSTGRES_HOSTNAME" \
    --port "$POSTGRES_PORT" \
    --username "$POSTGRES_USER" \
    --no-password \
    --template 'template0' \
    --tablespace 'pg_default' \
    $POSTGRES_DATABASE