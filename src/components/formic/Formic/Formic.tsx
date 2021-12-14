import { useCallback, useMemo, useRef, useState } from 'react';

import { ValidateContext } from '../../../hooks/useValidateContext';
import { NormalizeContext } from '../../../hooks/useNormalizeContext';
import { TriggerContext } from '../../../hooks/useTriggerContext';
import { ValidateConfigContext } from '../../../hooks/useValidateConfigContext';

import { deepPickFromConfig, isFunction } from '../../../utils/helpers';
import validate from '../../../utils/validate';

import { FormicPropsType } from '../../../types/formic';
import { StylesContext } from '../../../hooks/useStylesContext';

const Formic = (props: FormicPropsType) => {
    const { onSubmit, config, triggers, fieldErrorStyles, formAttributes } = props;
    const [validateResult, setValidateResult] = useState({
        allIsPass: false,
    } as {
        messages: {
            [fieldName: string]: string | null;
        };
        allIsPass: boolean;
    });
    const formRef = useRef<HTMLFormElement>(null);
    const handleTriggerContext = (
        resultOfValidate: { message: string | null },
        fieldName: string,
    ) => {
        setValidateResult((prevValue) => {
            const newMessages = {
                ...prevValue.messages,
                [fieldName]: resultOfValidate.message,
            };
            if (Object.values(newMessages).every((el) => !el)) {
                return {
                    messages: {
                        ...prevValue.messages,
                        [fieldName]: resultOfValidate.message,
                    },
                    allIsPass: true,
                };
            }
            return {
                messages: {
                    ...prevValue.messages,
                    [fieldName]: resultOfValidate.message,
                },
                allIsPass: false,
            };
        });
    };
    const handleTrigger = useCallback(() => {
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const validateConfig = deepPickFromConfig(config, 'validates');
            setValidateResult(validate(formData, validateConfig));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const normalizeConfig = useMemo(
        () => deepPickFromConfig(config, 'normalize'),
        [config],
    );

    const isOnSubmitTrigger = triggers?.onSubmit ?? true;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (isOnSubmitTrigger) {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const validateConfig = deepPickFromConfig(config, 'validates');
            const validateResult = validate(formData, validateConfig);
            setValidateResult(validate(formData, validateConfig));
            if (validateResult.allIsPass) {
                onSubmit(e);
            }
        } else {
            onSubmit(e);
        }
    }

    if (isFunction(props.children))
        return (
            <StylesContext.Provider value={fieldErrorStyles}>
            <NormalizeContext.Provider value={normalizeConfig}>
                <ValidateContext.Provider value={validateResult}>
                    <TriggerContext.Provider
                        value={{ ...triggers, handleTriggerContext }}
                    >
                        <ValidateConfigContext.Provider
                            value={deepPickFromConfig(config, 'validates')}
                        >
                            <form
                                {...formAttributes}
                                onSubmit={handleSubmit}
                                ref={formRef}
                            >
                                {props.children(
                                    handleTrigger,
                                    !validateResult.allIsPass,
                                )}
                            </form>
                        </ValidateConfigContext.Provider>
                    </TriggerContext.Provider>
                </ValidateContext.Provider>
            </NormalizeContext.Provider>
            </StylesContext.Provider>
        );
    return <form onSubmit={onSubmit}>{props.children}</form>;
};

export default Formic;
