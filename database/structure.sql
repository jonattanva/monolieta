CREATE TABLE namespaces (
    id integer NOT NULL,
    name character varying NOT NULL,
    path character varying NOT NULL,
    owner_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL
);

CREATE SEQUENCE namespaces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE projects (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text,
    namespaces_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    created_id integer NOT NULL
);

CREATE SEQUENCE projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE projects_id_seq OWNED BY projects.id;
ALTER SEQUENCE namespaces_id_seq OWNED BY namespaces.id;

ALTER TABLE ONLY projects ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY namespaces ADD CONSTRAINT namespaces_pkey PRIMARY KEY (id);

ALTER TABLE ONLY projects
    ADD CONSTRAINT projects_namespaces_id_fkey FOREIGN KEY (namespaces_id) 
    REFERENCES namespaces(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;