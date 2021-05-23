import {useField} from "formik";
import React from "react";
import Calendar from "react-calendar";
import {Form, Label, Message} from "semantic-ui-react";
import DatePicker from 'react-datepicker';

interface Props {
    label: string;
    name: string;
    min?: Date;
}

const CustomDatePicker = (props: Props) => {
    const [field, meta, helpers] = useField<Date>(props.name);

    function handleChange(date: Date | Date[]) {
        helpers.setValue(date instanceof Date ? date : date[0], true);
    }

    return (
        <Form.Field>
            <Label content={props.label}  />
            <Calendar {...field} {...props} onChange={handleChange}/>
            {
                !meta.touched && meta.error &&
                <Message error>
                    {meta.error}
                </Message>
            }
        </Form.Field>
    )
};

export default CustomDatePicker;