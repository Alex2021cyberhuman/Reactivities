import Activity from "../../../models/Activity";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import '../../../models/DateExtensions';
import {useState} from "react";
interface Props {
    activities: Map<string, Activity>;
    onEdit: (item:Activity) => void;
    onSelect: (item:Activity) => void;
    onDelete: (item:Activity) => void;
    deleting: boolean;
    submitting: boolean;
}

const ActivityList = ({activities, onSelect, onEdit, onDelete, deleting, submitting}:Props) => {
    const [deletingId, setDeletingId] = useState<string>('');
    const handleDelete = (item: Activity) => {
        if (!item.id) return;
        setDeletingId(item.id);
        onDelete(item);
    }
    return (
        <Segment>
            <Item.Group divided>
                {Array.from(activities).map(([key, activity]) => (
                    <Item key={key}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {activity.title}
                            </Item.Header>
                            <Item.Meta>
                                {activity.date.toISODateString()}
                            </Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' primary onClick={() => onSelect(activity)}/>
                                <Button floated='right' content='Edit' disabled={deleting || submitting} onClick={() => onEdit(activity)}/>
                                <Button loading={deleting && deletingId === key} disabled={deleting || submitting} floated='right' content='Delete' color='red' onClick={() => handleDelete(activity)}/>
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