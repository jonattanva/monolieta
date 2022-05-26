import Button from "../../components/button";
import Radio from "../../components/radio";
import Text from "../../components/text";
import Textarea from "../../components/textarea";
import classes from "./new.module.css";
import global from "./global.module.css";
import { useRef, useState } from "react";

export type Project = {
    [key: string]: string;
};

type Event = {
    change: (name: string, value: string) => void;
};

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

type PropTypes = {
    onSubmit?: (form: Project) => void | Promise<void>;
};

export default function New(props: PropTypes) {
    const [error, setError] = useState<string>("");
    const formRef = useRef<Project>({
        privacy: "public",
    });

    const isNameValid = () =>
        formRef.current.name && formRef.current.name.trim().length > 0;

    const change = (name: string, value: string) =>
        (formRef.current[name] = value);

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
        <div className={global.main}>
            <div className={classes.title}>Create a new project</div>
            <Input
                autofocus={true}
                change={change}
                error={error}
                name="name"
                test="project-name"
                text="Project name"
            />
            <Description change={change} />
            <Privacy
                change={change}
                message="Anyone on the internet can see this repository"
                value="public"
                checked={true}
            >
                <Public />
            </Privacy>
            <Privacy
                change={change}
                message="Project access must be granted explicitly to each user"
                value="private"
            >
                <Private />
            </Privacy>
            <Button
                click={submit}
                test="create-project"
                text="Create project"
            />
        </div>
    );
}

function Input(props: InputPropTypes) {
    const change = (event: React.ChangeEvent<HTMLInputElement>) =>
        props.change(event.target.name, event.target.value);

    return (
        <label className={classes.label}>
            {props.text}
            <Text
                autofocus={props.autofocus}
                change={change}
                error={props.error}
                name={props.name}
                test={props.test}
            />
        </label>
    );
}

function Description(props: Event) {
    const change = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        props.change(event.target.name, event.target.value);

    return (
        <label className={classes.label}>
            Decription (Optional)
            <Textarea
                change={change}
                name="description"
                test="project-description"
            />
        </label>
    );
}

function Privacy(props: PrivacyPropTypes) {
    const click = (event: React.ChangeEvent<HTMLInputElement>) =>
        props.change(event.target.name, event.target.value);

    return (
        <div className={classes.privacy}>
            <Radio
                value={props.value}
                name="privacy"
                click={click}
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <div>Public</div>
        </div>
    );
}

function Private() {
    return (
        <div className={classes.icon}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
            </svg>
            <div>Private</div>
        </div>
    );
}
