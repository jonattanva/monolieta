import Form, { Project } from "../assets/templates/project/new";
import classes from "./new.module.css";
import { create } from "../assets/library/project";
import { useRouter } from "next/router";

export default function New() {
    const router = useRouter();

    const onSubmit = async (project: Project) => {
        try {
            const response = await create(project);
            router.push(`/namespace/project`);
        } catch (error) {
            console.error("Error ->", error);
        }
    };

    return (
        <div className={classes.main}>
            <Form onSubmit={onSubmit} />
        </div>
    );
}
