import {Button, Form, Segment} from "semantic-ui-react";
import {ChangeEvent, useEffect, useState} from "react";
import Activity, {empty} from "../../../models/Activity";
import '../../../models/DateExtensions';
import {observer} from "mobx-react-lite";
import {useHistory, useParams} from "react-router-dom";
import {useStore} from "../../../app/store";

interface Props {
    create?: boolean;
}

const ActivityForm = observer (({create = true}:Props) => {
    const history = useHistory<any>();
    const {id} = useParams<{id: string | undefined}>();
    const [activity, setActivity] = useState<Activity>(empty());
    const [submitting, setSubmitting] = useState<boolean>(false);
    const {activities} = useStore();
    
    useEffect(() => {
        if (!create && id)
            activities.findActivity(id)
                .then(a => setActivity(a));
    }, [id, create, activities]);
    
    const handleSubmit = () => {
        setSubmitting(true);        
        const promise = !create ? activities.edit(activity) : activities.create(activity);
        promise
            .then(() => history.push(`/activities/details/${activity.id}`))
            .finally(() => setSubmitting(false));
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
        setActivity({...activity, [event.target.name]: event.target.value})
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setActivity({...activity, [event.target.name]: new Date(event.target.value)});
    }
    
    const handleCancel = () => {
        if (create) {
            history.replace('/activities');
        } else {
            history.goBack();
        }        
    }
    
    return (
        <Segment clearing>
            <Form autoComplete='off' onSubmit={handleSubmit}>
                <Form.Input placeholdar='Title' value={activity.title} name='title' onChange={handleChange}/>
                <Form.TextArea placeholdar='Description' value={activity.description} name='description' onChange={handleChange}/>
                <Form.Input placeholdar='Category' value={activity.category} name='category' onChange={handleChange}/>
                <Form.Input type='date' placeholdar='Date' value={activity.date.toISODateString()} name='date' onChange={handleDateChange}/>
                <Form.Input placeholdar='City' value={activity.city} name='city' onChange={handleChange}/>
                <Form.Input placeholdar='Venue' value={activity.venue} name='venue' onChange={handleChange}/>

                <Button.Group widths='2'>
                    <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                    <Button floated='right' secondary color='grey'  type='button' content='Cancel' onClick={handleCancel} />
                </Button.Group>
            </Form>
        </Segment>
    )
});

export default ActivityForm;