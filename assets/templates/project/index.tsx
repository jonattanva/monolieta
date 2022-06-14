import Button from "../../components/button";
import Tab from "../../components/tab";
import classes from "./index.module.css";
import global from "./global.module.css";

type PropTypes = {
    onNewProject?: () => void;
};

export default function Home(props: PropTypes) {
    return (
        <div className={global.main}>
            <div className={classes.header}>
                <div className={classes.title}>Project</div>
                <Button
                    onClick={props.onNewProject}
                    test="new-project"
                    text="New project"
                />
            </div>
            <div>
                <Tab
                    options={["Your project", "Explorer project"]}
                    render={Body}
                />
            </div>
        </div>
    );
}

function Body(props: { selected: number }) {
    return <div>{props.selected}</div>;
}
