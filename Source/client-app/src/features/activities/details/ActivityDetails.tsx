import {Button, Card, Icon, Image} from "semantic-ui-react";
import Activity from "../../../models/Activity";
import '../../../models/DateExtensions';
import {observer} from "mobx-react-lite";
import {useActivityStore} from "../../../app/store/ActivityStore";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../../app/components/Loading";

const ActivityDetails = observer(() => {
    const store = useActivityStore();
    const {id} = useParams<{ id: string }>();
    const [activity, setActivity] = useState<Activity | undefined>(undefined);

    useEffect(() => {

    });

    const findActivity = async () => {
        setActivity(await store.findActivity(id));
    }
    
    if (!activity) {
        return <Loading/>
    } else {
        return (
            <Card fluid>
                <Image src={`${process.env.PUBLIC_URL}/categoryImages/${activity.category.toLowerCase()}.jpg`}
                       wrapped
                       ui={false}/>
                <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{activity.date.toLocaleString()}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                    <span className='address'>
                    <Icon name='address card'/>
                        {activity.city}, {activity.venue}
                </span>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button basic color='blue' content='Edit' as={NavLink}
                                to={`activities/edit/${activity.id}`}/>
                        <Button color='grey' content='Cancel' as={NavLink} to='activities'/>
                    </Button.Group>
                </Card.Content>
            </Card>
        )
    }
})

export default ActivityDetails;