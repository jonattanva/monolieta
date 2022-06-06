import Button from "../../components/button";
import Chart from "../../components/resources/chart";
import Fab from "../../components/fab";
import Information from "../../components/project-information";
import Setting from "../../components/resources/setting";
import Stats from "../../components/project-stats";
import classes from "./banner.module.css";

export default function Banner() {
    return (
        <div className={classes.main}>
            <div className={classes.action}>
                <Information
                    author="yann lecun"
                    project="mnist"
                    privacy="Public"
                />
                <div className={classes.control}>
                    <div className={classes.extra}>
                        <Fab>
                            <Chart width={20} height={20} />
                        </Fab>
                        <Fab>
                            <Setting width={20} height={20} />
                        </Fab>
                    </div>
                    <Button text="Start labeling" />
                </div>
            </div>
            <Stats />
            <div>
                The MNIST dataset is a set of handwritten digits that have been
                prepared for machine learning. It consists of 28x28 grayscale
                images of digits, along with a one-hot encoded label.
            </div>
        </div>
    );
}
