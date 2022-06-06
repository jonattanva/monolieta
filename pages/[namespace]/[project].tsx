import View from "../../assets/templates/project/detail";
import { useRouter } from "next/router";

export default function Detail() {
    const router = useRouter();
    const { namespace, project } = router.query;

    return (
        <div>
            <View />
        </div>
    );
}
