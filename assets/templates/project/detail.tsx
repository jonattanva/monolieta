import Banner from "./banner";
import Main from "../../components/main";
import classes from "./detail.module.css";
import Stats from "../../components/project-stats";
import Filter from "../../components/project-filter";
import { Grid } from "monolieta-virtual-scroll";

type PropTypes = {
    author: string;
    onBack?: () => void;
    project: string;
};

export default function Detail(props: PropTypes) {
    return (
        <Main>
            <Banner
                author={props.author}
                onBack={props.onBack}
                project={props.project}
            />
            <div className={classes.main}>
                <div className={classes.body}>
                    <Grid
                        columnWidth={100}
                        direction="vertical"
                        rowHeight={100}
                    >
                        {new Array(10)
                            .fill(0)
                            .map((_, i) =>
                                new Array(6)
                                    .fill(0)
                                    .map((_, j) => (
                                        <div key={j}>{`[${i} ${j}]`}</div>
                                    ))
                            )}
                    </Grid>
                </div>
                <div className={classes.extra}>
                    <div className={classes.stats}>
                        <Stats />
                    </div>
                    <div>
                        <Filter />
                    </div>
                </div>
            </div>
        </Main>
    );
}
