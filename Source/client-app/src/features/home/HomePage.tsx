import {Container, Header, Segment, Image, Button} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export const HomePage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                <Header as='h2' inverted>Welcome to Reactivities</Header>
                <Button color='blue' inverted as={NavLink} to='/activities'>Take me to activities</Button>
            </Container>
        </Segment>
        
    )
}