import { observer } from 'mobx-react-lite';
import React from 'react';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react';
import Activity from "../../../models/Activity";
import {NavLink} from "react-router-dom";


const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

const ActivityDetailsHeader = observer (({activity}: Props) => {
    
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0', position: 'relative'}}>
                <Image src={`${process.env.PUBLIC_URL}/categoryImages/${activity.category.toLowerCase()}.jpg`} fluid
                       style={activityImageStyle} alt='Activity category logo'/>
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{activity.date.toLocaleDateString()}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right' as={NavLink} to={`/activities/edit/${activity.id}`}>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    );
});

export default ActivityDetailsHeader;