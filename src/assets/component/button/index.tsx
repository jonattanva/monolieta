type PropTypes = {
    click?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void | Promise<void>;
    text?: string;
};

export default function Button(props: PropTypes) {
    return <button onClick={props.click}>{props.text}</button>;
}
