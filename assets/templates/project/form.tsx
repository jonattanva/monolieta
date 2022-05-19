import Button from "../../components/button";
import Icon from "../../components/icon";
import Radio from "../../components/radio";
import Text from "../../components/text";
import Textarea from "../../components/textarea";
import classes from "./form.module.css";
import global from "./global.module.css";
import iPrivate from "../../images/lock-close.svg";
import iPublic from "../../images/globe.svg";
import { useRef, useState } from "react";

type Form = {
    [key: string]: string;
};

type Event = {
    change: (name: string, value: string) => void;
};

type InputPropTypes = {
    autofocus?: boolean;
    error?: string;
    name: string;
    text: string;
} & Event;

type PrivacyPropTypes = {
    checked?: boolean;
    children: React.ReactNode;
    message: string;
    value: "public" | "private";
} & Event;

type PropTypes = {
    submit?: (form: Form) => {} | Promise<void>;
};

export default function Form(props: PropTypes) {
    const [error, setError] = useState<string>();
    const formRef = useRef<Form>({
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
        if (props.submit) {
            props.submit(formRef.current);
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
                text="Project name"
            />
            <Description change={change} />

            <Privacy
                change={change}
                message="Anyone on the internet can see this repository"
                value="public"
                checked={true}
            >
                <div className={classes.icon}>
                    <Icon source={iPublic} hash="globe" />
                    <div>Public</div>
                </div>
            </Privacy>

            <Privacy
                change={change}
                message="Project access must be granted explicitly to each user"
                value="private"
            >
                <div className={classes.icon}>
                    <Icon source={iPrivate} hash="lock-close" />
                    <div>Private</div>
                </div>
            </Privacy>

            <Button text="Create project" click={submit} />
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
            <Textarea name="description" change={change} />
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
