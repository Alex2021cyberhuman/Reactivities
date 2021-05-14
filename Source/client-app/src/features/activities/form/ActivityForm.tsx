import Activity from "../../../models/Activity";
import {Button, Form, Segment} from "semantic-ui-react";
import {useState} from "react";

interface Props {
    activity: Activity;
    onCancel: (item:Activity) => void;
}

const ActivityForm = ({activity, onCancel}:Props) => {
    const [formActivity, setFormActivity] = useState<Activity>(activity);
    
    const onSubmit = () =>
    {
        
    }

    const onChange = () => {
        
    };

    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholdar='Title' value={formActivity.title} name='title' onChange={onChange}/>
                <Form.TextArea placeholdar='Description' value={formActivity.description} name='description'/>
                <Form.Input placeholdar='Category' value={formActivity.category} name='category'/>
                <Form.Input placeholdar='Date' value={formActivity.date} name='date'/>
                <Form.Input placeholdar='City' value={formActivity.city} name='city'/>
                <Form.Input placeholdar='Venue' value={formActivity.venue} name='venue'/>
                <Button floated='right' positive type='submit' content='Submit' onClick={onSubmit}/>
                <Button floated='right' negative type='button' content='Cancel' onClick={() => {onCancel(activity)}}/>
            </Form>
        </Segment>
    )
}

export default ActivityForm;