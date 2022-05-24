import Head from "next/head";
import View from "../assets/templates/project";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    const onNewProject = () => router.push("/new");

    return (
        <div>
            <Head>
                <title>Monolieta</title>
            </Head>
            <View onNewProject={onNewProject} />
        </div>
    );
}
