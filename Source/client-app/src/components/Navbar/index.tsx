import {Button, Icon, Menu} from "semantic-ui-react";

interface Props {
    onCreate: () => void
}

const Navbar = ({onCreate} : Props) => {
    return (
        <Menu icon='labeled' stackable className='mb-5'>
            <Menu.Item
                name='icon'
            >
                <Icon name='users'/>
            </Menu.Item>
            <Menu.Item 
                name='title'
            >
                Reactivities
            </Menu.Item>
            <Menu.Item
                name='create_new'
                onClick={onCreate}
            >
                <Button positive size='mini'>
                    Create new
                </Button>
            </Menu.Item>
        </Menu>
    )
}

export default Navbar;