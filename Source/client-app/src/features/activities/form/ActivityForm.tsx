import {Button, Form, Segment} from "semantic-ui-react";
import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import Activity, {empty} from "../../../models/Activity";
import '../../../models/DateExtensions';
import {observer} from "mobx-react-lite";
import {useHistory, useParams} from "react-router-dom";
import {useStore} from "../../../app/store";
import React from "react";
import {Field, Formik, FormikBag, FormikHelpers} from "formik";
import {values} from "mobx";
import {AxiosError} from "axios";

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
    }, [id, create, activities]);
    
    /*
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
    
    
    };
    */

    
    
    const handleCancel = () => {
        if (create) {
            history.replace('/activities');
        } else {
            history.goBack();
        }
    };
    
    const handleSubmit = (values: Activity, helpers: FormikHelpers<Activity>) => {
        helpers.setSubmitting(true);
        activities.create(activity)
            .catch((reason)=> {
                console.log(reason.);
                if (reason.response && reason.code === '400') {
                    helpers.setErrors(reason.response.data);
                }
            })      
            
    }
    
    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={handleSubmit}>
                {({
                      values,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue
                  }) => (
                    <Form className='ui form' onSubmit={handleSubmit}>
                        <Field placeholdar='Title' name='title'/>
                        <Field placeholdar='Description' name='description'/>
                        <Field placeholdar='Category' name='category'/>
                        <Field type='date' placeholdar='Date' name='date' value={values.date.toISODateString()}
                               onChange={(event: SyntheticEvent<HTMLInputElement>) => {setFieldValue('date', new Date(event.currentTarget.value));}} />
                        <Field placeholdar='City' name='city'/>
                        <Field placeholdar='Venue' name='venue'/>
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