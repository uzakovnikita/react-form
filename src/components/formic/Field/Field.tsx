import { useState } from 'react';

import useNormalizeContext from '../../../hooks/useNormalizeContext';
import useTriggerContext from '../../../hooks/useTriggerContext';
import useValidateConfigContext from '../../../hooks/useValidateConfigContext';

import { validateField } from '../../../utils/validate/validate';
import normalize from '../../../utils/normalize';
import { getErrorMessageOfField } from '../../../utils/validate/getErrorsMessages';
import { isFunction } from '../../../utils/helpers';
import useValidateContext from '../../../hooks/useValidateContext';
import useStylesContext from '../../../hooks/useStylesContext';


import './Field.styles.scss';

const Field = (props: {
    name: string;
    [key: string]: string | ((arg: string) => string) | undefined;
}) => {
    const { name } = props;
    const normalizeRule = useNormalizeContext(name);
    const error = useValidateContext({ name });
    const triggers = useTriggerContext();
    const validateConfig = useValidateConfigContext();
    const {
        onChange,
        handleTriggerContext
    } = triggers;
    const fieldErrorStyles = useStylesContext();
    const [value, setValue] = useState('');
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange ?? true) {
            const resultOfValidate = validateField(e.target.value, validateConfig[name], {isPass: true});
            const message = getErrorMessageOfField(resultOfValidate);
            handleTriggerContext({message}, name)
        }
        if (isFunction(normalizeRule)) {
            const normalizedValue = normalizeRule(e.target.value);
            setValue(normalizedValue);
        } else {
            const normalizedValue = normalize(
                normalizeRule as string,
                e.target.value,
            );
            setValue(normalizedValue);
        }
    };

    return <input {...props} onChange={handleChange} value={value} style={!!error ? {...fieldErrorStyles} : {}} />;
};

export default Field;
