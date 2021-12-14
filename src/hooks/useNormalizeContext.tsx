import React, { useContext } from "react"
import { NormalizeConfigType } from '../types/formic';

export const NormalizeContext = React.createContext<NormalizeConfigType | undefined>(undefined);

const useNormalizeContext = (name: string) => {
    return (useContext(NormalizeContext) as NormalizeConfigType)[name];
};

export default useNormalizeContext;