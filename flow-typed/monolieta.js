declare module Monolieta {

    declare type Label = {
        id: string,
        color: string,
        name: string,
        selected?: boolean
    }

    declare type Resource = {
        id: string,
        file: File,
        selected?: boolean
    }

    declare type Input = {
        value: string,
        onChange: (string) => void
    }

    declare type Option = {
        filename?: string,
        description?: string,
        extensions?: Array<string>
    }

    declare type Project = {
        key?: string,
        name?: string,
        resources?: Array<Resource>,
        classes?: Array<Label>
    }

    declare type Action = {
        type: Type,
        project: Project
    }

    declare type Dispatch = (action: Action) => void

    declare type Type = '/start' | '/class' | '/resource'
}
