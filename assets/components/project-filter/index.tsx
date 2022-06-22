import Button from "../button";
import Label from "../label";
import Select from "../select";
import classes from "./index.module.css";

export default function Filter() {
    return (
        <div className={classes.main}>
            <Label title="Select">
                <Select />
            </Label>
            <Label title="Group by">
                <Select />
            </Label>
            <Label title="Sort by">
                <Select />
            </Label>
            <Label title="Order">
                <Select />
            </Label>
            <div>
                <Button text="Filter" />
            </div>
        </div>
    );
}
