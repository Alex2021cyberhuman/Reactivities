import {useStore} from "../../store";
import LoginRegisterButtons from "./LoginRegisterButtons";
import {Menu, Image} from "semantic-ui-react";
import React from "react";
import {NavLink} from "react-router-dom";

const ProfileNavbarPart = () => {
    const store = useStore();
    const user = store.user.current;
    if (!store.user.isLoggedIn)
        return (
            <Menu.Item name='loginRegister'>
                <LoginRegisterButtons/>
            </Menu.Item>
        );
    return (
        <>
            <Menu.Menu position={"right"}>
                <Menu.Item name='profile'>
                    {
                        store.user.isLoggedIn ?
                            <>
                                <NavLink to={`Profile/${user!.id}`}>
                                    <>
                                        <Image src={user?.imageUrl} avatar/>
                                        <span>Hello {user?.displayName}</span>
                                    </>
                                </NavLink>
                            </>
                            : <LoginRegisterButtons/>
                    }
                </Menu.Item>
            </Menu.Menu>
        </>
    );
};
export default ProfileNavbarPart;
