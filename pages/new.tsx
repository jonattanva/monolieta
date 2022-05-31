import View, { Project } from "../assets/templates/project/new";
import Snackbar from "../assets/components/snackbar";
import classes from "./new.module.css";
import useMessage from "../assets/hooks/message";
import { Fragment } from "react";
import { create } from "../assets/library/project";
import { useRouter } from "next/router";

export default function New() {
    return (
        <div className={classes.main}>
            <Body />
        </div>
    );
}

function Body() {
    const router = useRouter();
    const [isMessage, showMessge, configuration] = useMessage();

    const onSubmit = async (project: Project) => {
        try {
            const response = await create(project);
            router.push(`/namespace/project`);
        } catch (error) {
            if (error instanceof Error) {
                showMessge(error.message);
                return;
            }
            showMessge("Error creating project");
        }
    };

    return (
        <Fragment>
            <View onSubmit={onSubmit} />
            {isMessage && <Snackbar delay={5000} {...configuration} />}
        </Fragment>
    );
}
