import {useStore} from "../store";
import {useLocation} from "react-router-dom";
import {stringify} from "query-string";
import {history} from "../../index";

const useRedirectToLogin = () => {
    const store = useStore();
    const location = useLocation();
    console.log(location);
    if (!store.user.isLoggedIn) {
        history.push(`/Login?${stringify({redirectUrl: location.pathname + location.search} )}`);
    }
}

export default useRedirectToLogin;