import {Button, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <Segment textAlign='center' padded='very'>
            <Header>This page is not found</Header>
            <Button primary as={Link} to='/activities'>Go to activities</Button>
        </Segment>
    )
}

export default NotFound;