import {Button, Container, Image, Menu} from "semantic-ui-react";

interface Props {
    onCreate: () => void
}

const Navbar = ({onCreate} : Props) => {
    return (
        <Menu stackable className='navbar-gradient' inverted fixed="top">
            <Container>
                <Menu.Item
                    name='icon'
                    header
                >
                    <Image src="/logo.png" alt="logo" size="mini"/>
                </Menu.Item>
                <Menu.Item
                    name='title'
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