import {Button, Container, Image, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import ProfileNavbarPart from "./profile/ProfileNavbarPart";

const Navbar = () => {
    return (
        <Menu stackable className='navbar-gradient' inverted >
            <Container>
                <Menu.Item
                    name='icon'
                    header
                    as={NavLink}
                    to='/home'
                >
                    <Image src="/logo.png" alt="logo" size="mini"/>
                </Menu.Item>
                <Menu.Item
                    name='title'
                    as={NavLink}
                    to='/activities'
                >
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    name='create_new'
                >
                    <Button type='button'
                            as={NavLink}
                            to={'/activities/create'}>
                        Create Activity
                    </Button>
                </Menu.Item>
                <ProfileNavbarPart/>
            </Container>
            
        </Menu>
    )
}

export default Navbar;