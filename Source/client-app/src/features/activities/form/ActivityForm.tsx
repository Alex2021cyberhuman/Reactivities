import {Button, Form, Segment} from "semantic-ui-react";
import {useEffect, useState} from "react";
import Activity, {empty} from "../../../models/Activity";
import '../../../models/DateExtensions';
import {observer} from "mobx-react-lite";
import {useHistory, useParams} from "react-router-dom";
import {useStore} from "../../../app/store";
import React from "react";
import {Formik, FormikHelpers} from "formik";
import CustomTextInput from "../../../app/components/form/CustomTextInput";
import CustomSelect from "../../../app/components/form/CustomSelect";
import CustomFormCalendar from "../../../app/components/form/CustomFormCalendar";
import {getCategoryOptions} from "../../../models/Categories";

interface Props {
    create?: boolean;
}

const ActivityForm = observer(({create = true}: Props) => {
    const history = useHistory<any>();
    const {id} = useParams<{ id: string | undefined }>();
    const [activity, setActivity] = useState<Activity>(empty());
    const {activities} = useStore();
    
    useEffect(() => {
        if (!create && id)
            activities.findActivity(id)
                .then(a => setActivity(a));
        if (!create && !id)
            history.push('/notFound');
    }, [id, create, activities, history]);
    
    const handleCancel = () => {
        if (create) {
            history.replace('/activities');
        } else {
            history.goBack();
        }
    };
    
    const handleSubmit = (values: Activity, helpers: FormikHelpers<Activity>) => {
        console.log(values);        
        helpers.setSubmitting(true);
        const targetPromise = create ? activities.create(values) : activities.edit(values);
        targetPromise
            .then(() => {
                setActivity(values);
            })
            .catch((reason)=> {
                console.log(reason);
                if (reason.response && reason.code === '400') {
                    helpers.setErrors(reason.response.data);
                }
            })
            .finally(() => helpers.setSubmitting(false));
    }
    
    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={handleSubmit}>
                {({
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <Form className='ui form' onSubmit={handleSubmit}>
                        <CustomTextInput name='title' label='Title'/>
                        <CustomTextInput label='Description' name='description'/>
                        <CustomSelect options={getCategoryOptions()} label='Category' name='category'/>
                        <CustomFormCalendar name='date' label='Date'/>
                        <CustomTextInput label='City' name='city'/>
                        <CustomTextInput label='Venue' name='venue'/>
                        <Button.Group widths='2'>
                            <Button loading={isSubmitting} floated='right' positive type='submit' content='Submit'/>
                            <Button floated='right' secondary color='grey' type='button' content='Cancel'
                                    onClick={handleCancel}/>
                        </Button.Group>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
});

export default ActivityForm;