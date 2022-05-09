CREATE TABLE namespaces (
    id INTEGER NOT NULL,
    name CHARACTER VARYING NOT NULL,
    path CHARACTER VARYING NOT NULL,
    description TEXT,
    owner_id INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
);

CREATE SEQUENCE namespaces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE namespaces_id_seq OWNED BY namespaces.id;

CREATE TABLE projects (
    id INTEGER NOT NULL,
    name CHARACTER VARYING NOT NULL,
    path CHARACTER VARYING NOT NULL,
    namespaces_id INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
);

CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE projects_id_seq OWNED BY projects.id;

ALTER TABLE ONLY namespaces 
    ALTER COLUMN id SET DEFAULT nextval('namespaces_id_seq');

ALTER TABLE ONLY projects 
    ALTER COLUMN id SET DEFAULT nextval('projects_id_seq');

ALTER TABLE ONLY namespaces 
    ADD CONSTRAINT namespaces_pkey PRIMARY KEY (id);

ALTER TABLE ONLY projects 
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);

ALTER TABLE ONLY projects
    ADD CONSTRAINT fk_projects_namespaces FOREIGN KEY (namespaces_id) 
    REFERENCES namespaces(id) MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT;