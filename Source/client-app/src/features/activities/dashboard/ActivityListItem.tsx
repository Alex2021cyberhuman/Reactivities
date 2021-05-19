import Activity from "../../../models/Activity";
import {Button, Icon, Item, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useState} from "react";

interface Props {
    activity: Activity;
    deleting: boolean;
    onDelete: (id: string) => Promise<void>;
}

const ActivityListItem = ({activity, onDelete, deleting}: Props) => {
    const [thisDeleting, setThisDeleting] = useState<boolean>(false);
    const handleDelete = () => {
        setThisDeleting(true);
        onDelete(activity.id)
            .then(() => setThisDeleting(false));
    }
    
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={`${process.env.PUBLIC_URL}/user.png`}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/details/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by ...
                            </Item.Description>                            
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {activity.date.toLocaleDateString()}
                    <Icon name='marker' /> {activity.city}, {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link}
                    to={`/activities/details/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'/>
                <Button
                    as={Link}
                    to={`/activities/edit/${activity.id}`}
                    color='blue'
                    floated='right'
                    content='Edit'/>
                <Button
                    onClick={handleDelete}
                    color='red'
                    floated='right'
                    content='Delete'
                    loading={thisDeleting && deleting}
                />
            </Segment>
        </Segment.Group>
    )
}

export default ActivityListItem;