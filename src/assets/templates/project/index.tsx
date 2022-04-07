import Header from "../header";
import Tab from "../../components/tab";
import Button from "../../components/button";
import Project from "../../components/project";

const options = ["Your project", "Explorer project"];

type PropTypes = {
    selected?: number;
};

export default function Home(props: PropTypes) {
    return (
        <div>
            <Header />
            <div>
                <div>Project</div>
                <div>
                    <Button text="New project" />
                </div>
            </div>
            <Body />
        </div>
    );
}

function Body(props: PropTypes) {
    return (
        <div>
            <Tab render={Content} options={options} selected={props.selected} />
        </div>
    );
}

function Content(props: PropTypes) {
    return (
        <div>
            <div>{props.selected}</div>
            <div>
                <Project />
            </div>
        </div>
    );
}
