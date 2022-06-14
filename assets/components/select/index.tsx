import classes from "./index.module.css";

type PropTypes = {};

export default function Select(props: PropTypes) {
    function change(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
    }

    return (
        <div className={classes.main}>
            <input type="text" onChange={change} />
            <div>
                <ul>
                    <li>Prueba 1</li>
                    <li>Prueba 2</li>
                </ul>
            </div>
        </div>
    );
}
