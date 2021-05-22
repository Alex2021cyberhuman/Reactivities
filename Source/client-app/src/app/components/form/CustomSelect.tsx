import {useField} from "formik";
import {Form, Label, Message, Select} from "semantic-ui-react";
import * as React from "react";
import {DropdownProps} from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";

export interface Option {
    value: string,
    text: string
}

interface Props {
    options: Option[],
    name: string,
    label: string
}

const CustomSelect = (props: Props) => {
    const [field, meta, helpers] = useField(props.name);

    const handleChange = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        helpers.setValue(data.value, true);
    };

    return (
        <Form.Field>
            <Label content={props.label}/> 
            <Select placeholder={props.label} {...field} {...props} onChange={handleChange} name={props.name} id={props.name}/>
            {
                meta.touched && meta.error &&
                <Message error>
                    {meta.error}
                </Message>
            }
        </Form.Field>

    )
};

export default CustomSelect;