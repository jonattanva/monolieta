import View from "../../assets/templates/project/detail";
import { useRouter } from "next/router";

export default function Detail() {
    const router = useRouter();
    const { namespace, project } = router.query;

    // TODO: OBTENER LA INFORMACION DEL PROJECTO

    return (
        <div>
            <h1>Detail</h1>
            <p>namespace: {namespace}</p>
            <p>project: {project}</p>
            <View />
        </div>
    );
}
