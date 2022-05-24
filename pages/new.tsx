import classes from "./new.module.css";
import Form, { Project } from "../assets/templates/project/new";

export default function New() {
    const onSubmit = (project: Project) => {
        console.log(project);
    };

    return (
        <div className={classes.main}>
            <Form submit={onSubmit} />
        </div>
    );
}
