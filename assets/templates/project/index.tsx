import Tab from "../../components/tab";
import Button from "../../components/button";

export default function Home() {
    return (
        <div>
            <div>
                <div>Project</div>
                <Button text="New project" test="project" />
            </div>
            <div>
                <Tab options={["Your project", "Explorer project"]} />
            </div>
        </div>
    );
}
