#! /bin/bash

createdb \
    --host "$POSTGRES_HOSTNAME" \
    --username "$POSTGRES_USERNAME" \
    --no-password \
    --template 'template0' \
    --tablespace 'pg_default' \
    $POSTGRES_DATABASE