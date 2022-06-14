import Button from "../button";
import Select from "../select";
import classes from "./index.module.css";

export default function Filter() {
    return (
        <div className={classes.main}>
            <label>
                Select
                <Select />
            </label>

            <label>
                Group by
                <Select />
            </label>

            <label>
                Sort by
                <Select />
            </label>

            <label>
                Order
                <Select />
            </label>
            <div>
                <Button text="Filter" />
            </div>
        </div>
    );
}
