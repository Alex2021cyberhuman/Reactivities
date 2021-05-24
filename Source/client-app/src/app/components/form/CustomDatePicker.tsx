import {useField} from "formik";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {Form, Label, Message} from "semantic-ui-react";
import DatePicker from 'react-datepicker';

interface Props {
    label: string;
    name: string;
    min?: Date;
}

const CustomDatePicker = (props: Props) => {
    const [field, meta, helpers] = useField<Date>(props.name);

    function handleChange(date: Date | [Date, Date] | null,) {
        if (date instanceof  Date)
            helpers.setValue(date, true);
    }

    return (
        <Form.Field>
            <Label content={props.label}  />
            <DatePicker onChange={handleChange} selected={field.value} minDate={props.min} showTimeInput showTimeSelect className='ui input'/>
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