import Activity from "../../../models/Activity";
import {Button, Form, Segment} from "semantic-ui-react";

interface Props {
    activity: Activity;
}

const ActivityForm = ({}:Props) => {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholdar='Title'/>
                <Form.TextArea placeholdar='Description'/>
                <Form.Input placeholdar='Category'/>
                <Form.Input placeholdar='Date'/>
                <Form.Input placeholdar='City'/>
                <Form.Input placeholdar='Venue'/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button floated='right' negative type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}

export default ActivityForm;