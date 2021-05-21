import {Message} from "semantic-ui-react";

interface Error {
    key: string,
    problems: string[]
}

interface Props {
    errors: Error[]
}

const ValidationErrors = ({errors}: Props) => {
    console.log(errors);
    return (
        <Message error header='Validation error' list={
            errors.map((error, index) => (
                <Message.List key={index} items={error.problems}/>
            ))}/>)
}

export const getNewValidationError = (errors: any) => {
    return () => <ValidationErrors errors={errors}/>
}

export default ValidationErrors;