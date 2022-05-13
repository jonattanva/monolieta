import classes from "./index.module.css";

type PropTypes = {
    click?: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void | Promise<void>;
    children?: React.ReactNode | string;
    name?: string;
    test?: string;
    value?: string;
    checked?: boolean;
};

export default function Radio(props: PropTypes) {
    return (
        <label className={classes.main}>
            <input
                type="radio"
                data-testid={props.test}
                name={props.name}
                onChange={props.click}
                value={props.value}
                defaultChecked={props.checked}
            />
            {props.children}
        </label>
    );
}
