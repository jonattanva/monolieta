import Search from "../../components/search";
import Profile from "../../components/profile";

export default function Header() {
    return (
        <div>
            <div>
                <Search />
            </div>
            <div>
                <Profile />
            </div>
        </div>
    );
}
