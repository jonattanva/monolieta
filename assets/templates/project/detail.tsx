import Button from "../../components/button";
import Chart from "../../components/resources/chart";
import Document from "../../components/resources/document";
import Fab from "../../components/fab";
import Setting from "../../components/resources/setting";
import Storage from "../../components/resources/storage";
import classes from "./detail.module.css";

export default function Detail() {
    return (
        <div>
            <div>
                <div>
                    <div>Yann LeCun / MNIST</div>
                    <div>
                        The MNIST database of handwritten digits, available from
                        this page, has a training set of 60,000 examples, and a
                        test set of 10,000 examples. It is a subset of a larger
                        set available from NIST. The digits have been
                        size-normalized and centered in a fixed-size image
                    </div>
                    <div>
                        <div>
                            <div>
                                <Document width={18} height={18} />
                            </div>
                            <div>70000 Files</div>
                        </div>
                        <div>
                            <div>
                                <Storage width={18} height={18} />
                            </div>
                            <div>21 GB Storage</div>
                        </div>
                    </div>
                </div>
                <div className={classes.action}>
                    <Fab>
                        <Chart width={20} height={20} />
                    </Fab>
                    <Fab>
                        <Setting width={20} height={20} />
                    </Fab>
                    <Button text="Start labeling" />
                </div>
            </div>
        </div>
    );
}

function Author() {
    return (
        <div>
            <div>
                <div>
                    <div>Monolieta</div>
                </div>
                <div>/</div>
                <div>
                    <div>Temporal</div>
                </div>
            </div>
            <div>Private</div>
        </div>
    );
}
