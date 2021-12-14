import React, { useContext } from "react"
import { StylesContextType } from '../types/formic';

export const StylesContext = React.createContext<StylesContextType | undefined>(undefined);

const useStylesContext = () => {
    return (useContext(StylesContext) as StylesContextType);
};

export default useStylesContext;