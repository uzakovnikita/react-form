import React, { useContext } from "react"
import { TriggersContextType } from '../types/formic';

export const TriggerContext = React.createContext<TriggersContextType | undefined>(undefined);

const useTriggerContext = () => {
    return (useContext(TriggerContext) as TriggersContextType);
};

export default useTriggerContext;