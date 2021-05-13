import Activity from "../../../models/Activity";
import {Button, Item, ItemExtra, Label, List} from 'semantic-ui-react';

interface Props {
    activity: Activity,
    onSelect: (item: Activity) => void
}

const ActivityListItem = ({activity, onSelect}:Props) => {
    return (
        <List.Item>
            <List.Icon name='users'/>
            <List.Content>
                <List.Header>{activity.title}</List.Header>
                <List.Description>
                    {activity.description}
                </List.Description>
                <Item.Meta>
                    <span className='fs-7'>
                        {activity.date}, {activity.city}
                    </span>
                    <div>
                        <br/>
                        <Label positive size='mini'>
                            {activity.category}
                        </Label>
                    </div>
                </Item.Meta>
                <Item.Extra size='mini'>
                    <div className='my-2'>
                        <Button color='yellow' size='mini' onClick={() => onSelect(activity)}>
                            View
                        </Button>
                        <Button color='blue'  size='mini'>
                            Edit
                        </Button>    
                    </div>                    
                </Item.Extra>                
            </List.Content>
        </List.Item>
    )
}

export default ActivityListItem;