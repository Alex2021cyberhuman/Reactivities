import {Button, Container, Image, Menu} from "semantic-ui-react";
import {useActivityStore} from "../store/ActivityStore";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const store = useActivityStore();
    const onCreate = store.handleCreating;
    return (
        <Menu stackable className='navbar-gradient' inverted fixed="top">
            <Container>
                <Menu.Item
                    name='icon'
                    header
                    as={NavLink}
                    to='home'
                >
                    <Image src="/logo.png" alt="logo" size="mini"/>
                </Menu.Item>
                <Menu.Item
                    name='title'
                    as={NavLink}
                    to='activities'
                >
                    Reactivities
                </Menu.Item>
                <Menu.Item
                    name='create_new'
                >
                    <Button as='a' type='button' onClick={onCreate}>
                        Create Activity
                    </Button>
                </Menu.Item>    
            </Container>
            
        </Menu>
    )
}

export default Navbar;