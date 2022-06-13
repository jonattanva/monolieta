import Banner from "./banner";
import Main from "../../components/main";
import classes from "./detail.module.css";
import { Grid } from "monolieta-virtual-scroll";

type PropTypes = {
    author: string;
    project: string;
};

export default function Detail(props: PropTypes) {


    return (
        <Main>
            <Banner author={props.author} project={props.project} />
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
                                        <div
                                            key={j}
                                        >{`[${i} ${j}]`}</div>
                                    ))
                            )}
                    </Grid>
                </div>
                <div>
                    <div>Stats</div>
                    <div>Filter</div>
                </div>
            </div>
        </Main>
    );
}
