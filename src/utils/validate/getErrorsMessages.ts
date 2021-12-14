import { ResultOfValidateType, errorsMessagesType } from '../../types/formic';

export const getErrorMessageOfField = (
    validateResultsOfCurrentField: {
        resultOfCheck: boolean;
        message: string;
        priority: number;
    }[],
) => {
    let prevPriorityOfMessage = 1000000000000;
    let errorsMessages = null;
    for (const validateResultOfCurrentField of validateResultsOfCurrentField) {
        const { message, priority, resultOfCheck } =
            validateResultOfCurrentField;
        if (priority === 0) {
            console.log(!resultOfCheck);
        }
        if (
            (prevPriorityOfMessage > priority || !errorsMessages) &&
            !resultOfCheck
        ) {
            errorsMessages = message;
            prevPriorityOfMessage = Number(priority);
        }
    }
    return errorsMessages;
};

const getErrorsMessages = (
    validateResult: ResultOfValidateType,
): errorsMessagesType => {
    let errorsMessages: errorsMessagesType = {};
    for (const fieldName in validateResult) {
        errorsMessages[fieldName] = getErrorMessageOfField(
            validateResult[fieldName],
        );
    }
    return errorsMessages;
};

export default getErrorsMessages;
