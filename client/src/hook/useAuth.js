
import { getProfile } from "../redux/selector";
import { useSelector } from "react-redux";

export default function useAuth() {
    const profileLogin = useSelector(getProfile);

    const isAuthenticated = profileLogin.isAuthenticated;
    const profile = profileLogin.user;
    const position = profile?.position || null;

    return (isAuthenticated, position, profile)
}
