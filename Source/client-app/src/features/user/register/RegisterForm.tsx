import {useStore} from "../../../app/store";
import CustomTextInput from "../../../app/components/form/CustomTextInput";
import {Formik} from "formik";
import React from "react";
import {Segment, Form, Button, Message} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import * as Yup from "yup";
import RegisterModel from "../../../models/RegisterModel";
import {FormikHelpers} from "formik/dist/types";
import {StringParam, useQueryParam} from "use-query-params";
import {history} from "../../../index";

const RegisterForm = () => {
    const store = useStore();
    const [returnUrl] = useQueryParam("returnUrl", StringParam);
    const redirectUrl = (returnUrl || '/Activities') as any as string;
    if (store.user.isLoggedIn)
        history.replace(redirectUrl);
    let validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label('Password'),
        password: Yup.string().required().label('Password'),
        passwordConfirmation: Yup.string().required().oneOf([Yup.ref('password')]).label('Confirm password')
    });

    const handleSubmit = async (values: RegisterModel, helpers: FormikHelpers<RegisterModel>) => {
        try {
            await store.user.register(values);
            history.replace(redirectUrl);
        } catch (error) {
            if (!error.response) {
                console.log(error);
                return;
            }
            const {response} = error;
            if (response.status === 401) {
                helpers.setValues({...values, 'message': 'Unauthorized'});
                return;
            }

            helpers.setValues({...values, 'message': ''});
        }
    };

    return (
        <Segment clearing>
            <Formik enableReinitialize onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    initialValues={{email: '', password: '', message: ''} as RegisterModel} isInitialValid={false}>
                {({
                      handleSubmit,
                      isSubmitting,
                      isValid,
                      values
                  }) => (
                    <Form onSubmit={handleSubmit} error loading={isSubmitting} autoComplete='off'>
                        {values.message && <Message error content={values.message}/>}
                        <CustomTextInput name='email' label='Email' type='email'/>
                        <CustomTextInput name='userName' label='User name'/>
                        <CustomTextInput name='displayName' label='Display name'/>
                        <CustomTextInput name='password' label='Password' type='password'/>
                        <CustomTextInput name='passwordConfirmation' label='Repeat password' type='password'/>
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

export default RegisterForm;