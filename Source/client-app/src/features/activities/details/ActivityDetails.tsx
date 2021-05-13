import {Button, Card, Icon, Image} from "semantic-ui-react";
import Activity from "../../../models/Activity";

interface Props {
    activity: Activity
}

const ActivityDetails = ({activity: {category, city, date, description, title, venue}}: Props) => {
    return (
        <Card fluid>
            <Image src={`${process.env.PUBLIC_URL}/categoryImages/${category.toLowerCase()}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{date}</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
                <a>
                    <Icon name='address card' />
                    {city}, {venue}
                </a>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit'/>
                    <Button color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default ActivityDetails;