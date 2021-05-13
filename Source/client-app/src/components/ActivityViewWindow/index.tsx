import Activity from "../../models/Activity";
import {Card, Image, Label} from "semantic-ui-react";

interface Props {
    selectedActivity: Activity
}

const ActivityViewWindow = ({selectedActivity: {id, title, city, category, description, date}}: Props) => {
    console.log('category image:', `${process.env.PUBLIC_URL}/categoryImages/${category.toLowerCase()}`);
    return (
        <Card>
            <Image src={`${process.env.PUBLIC_URL}/categoryImages/${category.toLowerCase()}.jpg`} >
            </Image>
            <Card.Content>
                <Card.Header>
                    {title}
                </Card.Header>
                <Card.Meta>
                    {city}, {date}
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>                
            </Card.Content>
            <Card.Content extra>
                <Label content={category} color='blue'/>
            </Card.Content>
        </Card>
    )
}
export default ActivityViewWindow;