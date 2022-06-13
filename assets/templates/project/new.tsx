import Button from "../../components/button";
import Closed from "../../components/resources/closed";
import Globe from "../../components/resources/globe";
import Radio from "../../components/radio";
import Text from "../../components/text";
import Textarea from "../../components/textarea";
import classes from "./new.module.css";
import Main from "../../components/main";
import { useRef, useState } from "react";

export type Project = {
    [key: string]: string;
};

type Event = {
    onChange: (name: string, value: string) => void;
};

type FormPropTypes = {
    children: React.ReactNode;
    onSubmit: (form: Project) => void | Promise<void>;
} & Event;

type InputPropTypes = {
    autofocus?: boolean;
    error?: string;
    name: string;
    test?: string;
    text: string;
} & Event;

type PrivacyPropTypes = {
    checked?: boolean;
    children: React.ReactNode;
    message: string;
    value: "public" | "private";
} & Event;

const PRIVACY_PUBLIC = "public";

type PropTypes = {
    onSubmit?: (form: Project) => void | Promise<void>;
};

export default function New(props: PropTypes) {
    const formRef = useRef<Project>({
        privacy: PRIVACY_PUBLIC,
    });

    const onChange = (name: string, value: string) =>
        (formRef.current[name] = value);

    const onSubmit = () => {
        if (props.onSubmit) {
            props.onSubmit(formRef.current);
        }
    };

    return (
        <Main>
            <div className={classes.title}>Create a new project</div>
            <Form onChange={onChange} onSubmit={onSubmit}>
                <Description onChange={onChange} />
                <Privacy
                    onChange={onChange}
                    message="Anyone on the internet can see this repository"
                    value="public"
                    checked={true}
                >
                    <Public />
                </Privacy>
                <Privacy
                    onChange={onChange}
                    message="Project access must be granted explicitly to each user"
                    value="private"
                >
                    <Private />
                </Privacy>
            </Form>
        </Main>
    );
}

function Form(props: FormPropTypes) {
    const [error, setError] = useState<string>("");
    const formRef = useRef<Project>({
        privacy: PRIVACY_PUBLIC,
    });

    const isNameValid = () =>
        formRef.current.name && formRef.current.name.trim().length > 0;

    const onChange = (name: string, value: string) => {
        formRef.current[name] = value;
        if (props.onChange) {
            props.onChange(name, value);
        }
    };

    const submit = () => {
        if (!isNameValid()) {
            setError("The project name is required.");
            return;
        }

        setError("");
        if (props.onSubmit) {
            props.onSubmit(formRef.current);
        }
    };

    return (
        <>
            <Input
                autofocus={true}
                onChange={onChange}
                error={error}
                name="name"
                test="project-name"
                text="Project name"
            />
            {props.children}
            <Button
                click={submit}
                test="create-project"
                text="Create project"
            />
        </>
    );
}

function Input(props: InputPropTypes) {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        props.onChange(event.target.name, event.target.value);

    return (
        <label className={classes.label}>
            {props.text}
            <Text
                autofocus={props.autofocus}
                change={onChange}
                error={props.error}
                name={props.name}
                test={props.test}
            />
        </label>
    );
}

function Description(props: Event) {
    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        props.onChange(event.target.name, event.target.value);

    return (
        <label className={classes.label}>
            Decription (Optional)
            <Textarea
                change={onChange}
                name="description"
                test="project-description"
            />
        </label>
    );
}

function Privacy(props: PrivacyPropTypes) {
    const onClick = (event: React.ChangeEvent<HTMLInputElement>) =>
        props.onChange(event.target.name, event.target.value);

    return (
        <div className={classes.privacy}>
            <Radio
                value={props.value}
                name="privacy"
                click={onClick}
                checked={props.checked}
            >
                {props.children}
            </Radio>
            <span className={classes.help}>{props.message}</span>
        </div>
    );
}

function Public() {
    return (
        <div className={classes.icon}>
            <Globe width={24} height={24} />
            <div>Public</div>
        </div>
    );
}

function Private() {
    return (
        <div className={classes.icon}>
            <Closed width={24} height={24} />
            <div>Private</div>
        </div>
    );
}
