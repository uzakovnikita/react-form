import getErrorsMessages from './getErrorsMessages';

import defaultErrorsMessages from '../../constants/validate/defaultErrorsMessages';
import validateRules, {
    negativeTestRules,
    otherConditionalForCheck,
    priorityOfRules,
} from '../../constants/validate/validateRules';
import { listOfValidateRule } from '../../constants/formic/enums';

import {
    customValidateConfigType,
    defaultValidateConfigType,
    ResultOfValidateType,
    ValidateConfigType,
} from '../../types/formic';

const verificationIsPossible = (
    nameOfRule: listOfValidateRule,
    fieldValue: string,
) => {
    const conditionals = otherConditionalForCheck[nameOfRule];
    if (conditionals) {
        return conditionals
            .map((conditional) => conditional(fieldValue))
            .every((el) => el);
    }
    return true;
};

export const validateField = (
    fieldValue: string,
    fieldValidateConfigRules: (
        | defaultValidateConfigType
        | customValidateConfigType
    )[],
    allIsPass: { isPass: boolean },
) => {
    let result: ResultOfValidateType[string] = [];
    for (const fieldValidateConfigRule of fieldValidateConfigRules) {
        if ('nameOfRule' in fieldValidateConfigRule) {
            // defaultValidateConfig
            const { nameOfRule, message, customValue } =
                fieldValidateConfigRule;
            const currentRule = validateRules[nameOfRule];
            if (
                verificationIsPossible(
                    nameOfRule as listOfValidateRule,
                    String(fieldValue),
                )
            ) {
                let resultOfCheck = currentRule(String(customValue)).test(
                    String(fieldValue),
                );
                if (
                    negativeTestRules.includes(nameOfRule as listOfValidateRule)
                ) {
                    resultOfCheck = !resultOfCheck;
                }

                if (!resultOfCheck) {
                    allIsPass.isPass = false;
                }

                result.push({
                    message: message ?? defaultErrorsMessages[nameOfRule],
                    priority: priorityOfRules[nameOfRule],
                    resultOfCheck: resultOfCheck,
                });
            }
        } else if ('customValue' in fieldValidateConfigRule) {
            // customValidateConfig with customValue
            const { message, customValue, rule, priority } =
                fieldValidateConfigRule;
            let resultOfCheck = rule(customValue).test(String(fieldValue));
            if (!resultOfCheck) {
                allIsPass.isPass = false;
            }
            result.push({
                message,
                resultOfCheck,
                priority,
            });
        } else {
            // customValidateConfig without customValue
            const { message, rule, priority } = fieldValidateConfigRule;
            let resultOfCheck = rule().test(String(fieldValue));
            if (!resultOfCheck) {
                allIsPass.isPass = false;
            }
            result.push({
                message,
                resultOfCheck,
                priority,
            });
        }
    }
    return result;
};

const validate = (
    form: FormData,
    config: ValidateConfigType,
): {
    messages: {
        [fieldName: string]: string | null;
    };
    allIsPass: boolean;
} => {
    let resultOfValidate: ResultOfValidateType = {};
    let allIsPass = { isPass: true };

    for (const [fieldName, fieldValue] of form.entries()) {
        const fieldValidateConfigRules = config[fieldName];
        resultOfValidate[fieldName] = validateField(
            String(fieldValue),
            fieldValidateConfigRules,
            allIsPass,
        );
    }
    const messages = getErrorsMessages(resultOfValidate);
    return { messages: messages, allIsPass: allIsPass.isPass };
};

export default validate;
