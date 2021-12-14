import React, { useContext } from 'react';
import { ResultMessagesOfValidateType } from '../types/formic';

export const ValidateContext = React.createContext<
    undefined | ResultMessagesOfValidateType
>(undefined);

const useValidateContext = (
    req:
        | {
              allIsPass: 'allIsPass';
          }
        | { name: string },
) => {
    const resultMessagesOfValidate = useContext(
        ValidateContext,
    ) as ResultMessagesOfValidateType;
    if ('allIsPass' in req) {
        return resultMessagesOfValidate.allIsPass;
    }
    const propName = req.name;
    if (resultMessagesOfValidate.messages && propName in resultMessagesOfValidate.messages) {
        return resultMessagesOfValidate.messages[propName];
    }
    return null;
};

export default useValidateContext;
