import {Button, Card, Icon, Image} from "semantic-ui-react";
import Activity from "../../../models/Activity";
import '../../../models/DateExtensions';

interface Props {
    activity: Activity;
    onEdit: (item:Activity) => void;
    onCancel: (item:Activity) => void;
}

const ActivityDetails = ({activity, onEdit, onCancel}: Props) => {
    return (
        <Card fluid>
            <Image src={`${process.env.PUBLIC_URL}/categoryImages/${activity.category.toLowerCase()}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date.toISODateString()}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
                <span className='address'>
                    <Icon name='address card' />
                    {activity.city}, {activity.venue}
                </span>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit' onClick={() => onEdit(activity)}/>
                    <Button color='grey' content='Cancel' onClick={() => onCancel(activity)}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails;