import useValidateContext from '../../../hooks/useValidateContext';

import './ErrorMessage.styles.scss';

const ErrorMessage = (props: { name: string; for?: string }) => {
    const { name } = props;
    const error = useValidateContext({ name });
    return <label htmlFor={props.for}>{error}</label>;
};

export default ErrorMessage;
