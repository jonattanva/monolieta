import Head from "next/head";
import Snackbar from "../assets/components/snackbar";
import View, { Project } from "../assets/templates/project/new";
import classes from "./new.module.css";
import useMessage from "../assets/hooks/message";
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
    const [isMessage, showMessage, configuration] = useMessage();

    const onSubmit = async (project: Project) => {
        try {
            const response = await create(project);
            router.push(`/namespace/project`);
        } catch (error) {
            if (error instanceof Error) {
                showMessage(error.message);
                return;
            }
            showMessage("Error creating project");
        }
    };

    return (
        <>
            <Head>
                <title>New Project - Monolieta</title>
            </Head>
            <View onSubmit={onSubmit} />
            {isMessage && <Snackbar delay={5000} {...configuration} />}
        </>
    );
}
