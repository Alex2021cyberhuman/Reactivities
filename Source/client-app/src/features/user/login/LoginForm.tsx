import {useStore} from "../../../app/store";
import CustomTextInput from "../../../app/components/form/CustomTextInput";
import {Formik} from "formik";
import React from "react";
import {Segment, Form, Button, Message} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import * as Yup from "yup";
import LoginModel from "../../../models/LoginModel";
import {FormikHelpers} from "formik/dist/types";

const LoginForm = () => {
    const store = useStore();
    let validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label('Password'),
        password: Yup.string().required().label('Password')
    });

    const handleSubmit = async (values: LoginModel, helpers: FormikHelpers<LoginModel>) => {
        try {
            await store.user.login(values);
        } catch (error) {
            if (!error.response) {
                console.log(error);
                return;
            }
            const {response} = error;
            if (response.status === 401) {
                helpers.setValues( {...values, 'message': 'Unauthorized'});
                return;
            }

            helpers.setValues( {...values, 'message': ''});
        }
    };

    return (
        <Segment clearing>
            <Formik enableReinitialize onSubmit={handleSubmit}
                    validationSchema={validationSchema} initialValues={{email: '', password: '', message: ''} as LoginModel} isInitialValid={false}>
                {({
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      values
                  }) => (
                    <Form onSubmit={handleSubmit} error loading={isSubmitting} autoComplete='off'>
                        {values.message && <Message error content={values.message}/>}
                        <CustomTextInput name='email' label='Email'/>
                        <CustomTextInput name='password' label='Password' type='password'/>
                        <Button.Group widths='2'>
                            <Button loading={isSubmitting} disabled={isSubmitting || !isValid} floated='right' positive
                                    type='submit' content='Submit'/>
                            <Button disabled={isSubmitting} floated='right' secondary color='grey' type='button'
                                    content='Cancel' as={NavLink} to='/'/>
                        </Button.Group>
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default LoginForm;