import {useField} from "formik";
import React from "react";
import Calendar from "react-calendar";
import {Form, Label, Message} from "semantic-ui-react";

interface Props {
    label: string;
    name: string;    
}

const CustomFormCalendar = (props: Props) => {
    const [field, meta, helpers] = useField<Date>(props.name);

    function handleChange(date: Date | Date[]) {
        helpers.setValue(date instanceof Date ? date : date[0], true);
    }

    return (
        <Form.Field>
            <Label content={props.label}  />
            <Calendar {...field} {...props} onChange={handleChange}/>
            {
                meta.touched && meta.error &&
                <Message error>
                    {meta.error}
                </Message>
            }
        </Form.Field>
    )
};

export default CustomFormCalendar;