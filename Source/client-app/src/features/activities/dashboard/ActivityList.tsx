import Activity from "../../../models/Activity";
import {Button, Item, Label, Segment} from "semantic-ui-react";

interface Props {
    activities: Activity[];
    onEdit: (item:Activity) => void;
    onSelect: (item:Activity) => void;    
}

const ActivityList = ({activities, onSelect, onEdit}:Props) => {
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {activity.title}
                            </Item.Header>
                            <Item.Meta>
                                {activity.date}
                            </Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' primary onClick={() => onSelect(activity)}/>
                                <Button floated='right' content='Edit' onClick={() => onEdit(activity)}/>
                                <Label content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
export default ActivityList;