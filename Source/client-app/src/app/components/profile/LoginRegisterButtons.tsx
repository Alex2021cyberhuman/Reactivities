import {Button} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {stringify} from "query-string";

const LoginRegisterButtons = () => {
    return (
        <>
            <Button color='blue' inverted as={NavLink}
                    to={`/Login?${stringify({returnUrl: '/Activities'})}`}>Login</Button>
            <Button color='grey' inverted as={NavLink}
                    to={`/Login?${stringify({returnUrl: '/Activities'})}`}>Register</Button>
        </>
    );
};

export default LoginRegisterButtons;