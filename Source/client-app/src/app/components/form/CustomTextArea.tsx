import {useField} from "formik";
import {Form, Label, Message, TextArea} from "semantic-ui-react";

interface Props {
    label: string;
    name: string;
}

const CustomTextArea = (props: Props) => {
    const [field, meta] = useField<string>(props.name);
    return (
        <>
            <Form.Field>
                <Label content={props.label}/>
                <TextArea {...field} {...props} label={undefined}/>
            </Form.Field>
            {
                !meta.touched && meta.error &&
                <Message error>
                    {meta.error}
                </Message>
            }
        </>
    )
}

export default CustomTextArea;