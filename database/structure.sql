CREATE TABLE namespace (
    id integer NOT NULL,
    name character varying NOT NULL,
    path character varying NOT NULL,
    description text,
    owner_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);

CREATE SEQUENCE namespace_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE namespace_id_seq OWNED BY namespace.id;

ALTER TABLE ONLY namespace
    ALTER COLUMN id SET DEFAULT nextval('namespace_id_seq');

ALTER TABLE ONLY namespace
    ADD CONSTRAINT namespace_pkey PRIMARY KEY (id);

ALTER TABLE ONLY namespace
    ADD CONSTRAINT uq_namespace_2b3475fe UNIQUE ("name", "path");











CREATE TABLE projects (
    id integer NOT NULL,
    name character varying NOT NULL,
    path character varying NOT NULL,
    namespaces_id integer NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    archived boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE projects_id_seq OWNED BY projects.id;

ALTER TABLE ONLY projects 
    ALTER COLUMN id SET DEFAULT nextval('projects_id_seq');

ALTER TABLE ONLY projects 
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);

ALTER TABLE ONLY projects
    ADD CONSTRAINT fk_projects_014cb476 FOREIGN KEY (namespaces_id)
    REFERENCES namespaces(id) MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT;

ALTER TABLE ONLY projects
    ADD CONSTRAINT uq_projects_30ec1788 UNIQUE ("name", "path");