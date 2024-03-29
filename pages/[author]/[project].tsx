import Head from "next/head";
import View from "../../assets/templates/project/detail";
import classes from "./[project].module.css";
import { useRouter } from "next/router";

export default function Detail() {
    const router = useRouter();
    const { author, project } = router.query;

    // TODO: GET project data from API

    const onBack = () => {
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>{`${author} / ${project} - Monolieta`}</title>
            </Head>
            <div className={classes.main}>
                <View
                    author={author as string}
                    onBack={onBack}
                    project={project as string}
                />
            </div>
        </>
    );
}
