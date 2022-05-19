import Button from "../../components/button";
import Tab from "../../components/tab";
import classes from "./index.module.css";
import global from "./global.module.css";

export default function Home() {
    return (
        <div className={global.main}>
            <div className={classes.header}>
                <div className={classes.title}>Project</div>
                <Button text="New project" test="project" />
            </div>
            <div>
                <Tab options={["Your project", "Explorer project"]} />
            </div>
        </div>
    );
}
