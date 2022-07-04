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

CREATE TABLE project (
    id integer NOT NULL,
    name character varying NOT NULL,
    path character varying NOT NULL,
    namespace_id integer NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone,
    archived boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE project_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE namespace_id_seq OWNED BY namespace.id;
ALTER SEQUENCE project_id_seq OWNED BY project.id;

ALTER TABLE ONLY namespace
    ALTER COLUMN id SET DEFAULT nextval('namespace_id_seq');

ALTER TABLE ONLY project
    ALTER COLUMN id SET DEFAULT nextval('project_id_seq');

ALTER TABLE ONLY namespace
    ADD CONSTRAINT namespace_pkey PRIMARY KEY (id);

ALTER TABLE ONLY project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);

ALTER TABLE ONLY project
    ADD CONSTRAINT fk_project_namespace FOREIGN KEY (namespace_id)
    REFERENCES namespace(id) MATCH SIMPLE
    ON UPDATE RESTRICT
    ON DELETE RESTRICT;

ALTER TABLE ONLY projects
    ADD CONSTRAINT uq_project_30ec1788 UNIQUE ("name", "path");

ALTER TABLE ONLY namespace
    ADD CONSTRAINT uq_namespace_2b3475fe UNIQUE ("name", "path");