import React, { useContext } from "react"
import { ValidateConfigType } from '../types/formic';

export const ValidateConfigContext = React.createContext<ValidateConfigType | undefined>(undefined);

const useValidateConfigContext = () => {
    return (useContext(ValidateConfigContext) as ValidateConfigType);
};

export default useValidateConfigContext;