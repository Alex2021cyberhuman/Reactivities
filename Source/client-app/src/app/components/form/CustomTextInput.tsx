import {useField} from "formik";
import {Form, Input, Label, Message} from "semantic-ui-react";

interface Props {
    label: string;
    name: string;
    type?: string;
}

const CustomTextInput = (props: Props) => { 
    const [field, meta] = useField<string>(props.name);
    return (
        <>
            <Form.Field>
                <Label content={props.label}/>
                <Input {...field} {...props} label={undefined}/>
            </Form.Field>
            {
                meta.touched && meta.error &&
                <Message error>
                    {meta.error}
                </Message>
            }
        </>
    )
}

export default CustomTextInput;