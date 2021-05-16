import {Button, Form, Segment} from "semantic-ui-react";
import {ChangeEvent, useState} from "react";
import Activity, {empty} from "../../../models/Activity";
import '../../../models/DateExtensions';

interface Props {
    activity: Activity;
    onCancel: (item:Activity) => void;
    onSubmit: (item:Activity) => void;
    submitting: boolean;
}

const ActivityForm = ({activity, onCancel, onSubmit: onSave, submitting}:Props) => {
    const initialState = activity ?? empty();
    
    const [formActivity, setFormActivity] = useState<Activity>(initialState);
    
    const handleSubmit = () => {
        onSave(formActivity);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormActivity({...formActivity, [name]: value});
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormActivity({...formActivity, [name]: new Date(value)});
    }
    
    return (
        <Segment clearing>
            <Form autoComplete='off' onSubmit={handleSubmit}>
                <Form.Input placeholdar='Title' value={formActivity.title} name='title' onChange={handleChange}/>
                <Form.TextArea placeholdar='Description' value={formActivity.description} name='description' onChange={handleChange}/>
                <Form.Input placeholdar='Category' value={formActivity.category} name='category' onChange={handleChange}/>
                <Form.Input type='date' placeholdar='Date' value={formActivity.date.toISODateString()} name='date' onChange={handleDateChange}/>
                <Form.Input placeholdar='City' value={formActivity.city} name='city' onChange={handleChange}/>
                <Form.Input placeholdar='Venue' value={formActivity.venue} name='venue' onChange={handleChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button floated='right' negative type='button' content='Cancel' onClick={() => {onCancel(activity)}}/>
            </Form>
        </Segment>
    )
}

export default ActivityForm;