import React, { FormHTMLAttributes } from 'react';
import {
    listOfNormalizeRule,
    listOfValidateRule,
} from '../constants/formic/enums';

export type defaultValidateConfigType = {
    nameOfRule: keyof typeof listOfValidateRule;
    message?: string;
    customValue?: string | number;
};

export type customValidateConfigType =
    | {
          message: string;
          customValue: unknown;
          rule: (arg: unknown) => RegExp | { test: (arg2: string) => boolean };
          priority: number;
      }
    | {
          message: string;
          rule: () => RegExp | { test: (arg2: string) => boolean };
          priority: number;
      };

export type ValidateConfigType = {
    [fieldName: string]: (
        | defaultValidateConfigType
        | customValidateConfigType
    )[];
};

export type NormalizeConfigType = {
    [fieldName: string]:
        | keyof typeof listOfNormalizeRule
        | ((arg: string) => string);
};

export type ConfigType = {
    [fieldName: string]: {
        validates: (defaultValidateConfigType | customValidateConfigType)[];
        normalize: keyof typeof listOfNormalizeRule | ((arg: string) => string);
    };
};

export type TriggersType = {
    onChange?: boolean;
    onSubmit?: boolean;
};

export type TriggersContextType = {
    onChange?: boolean;
    onSubmit?: boolean;
    handleTriggerContext: (
        resultOfValidate: {
            message: string | null;
        },
        fieldName: string,
    ) => void;
};

export type FormicPropsType = {
    onSubmit: (e: React.FormEvent) => void | Promise<void>;
    config: ConfigType;
    children: React.ReactNode;
    triggers?: TriggersType;
    fieldErrorStyles?: StylesContextType,
    formAttributes?: FormHTMLAttributes<HTMLFormElement>
};

export type FormPropsType = {
    onSubmit: (e: React.FormEvent) => void | Promise<void>;
    children: React.ReactNode;
};

export type ResultOfValidateType = {
    [fieldName: string]: {
        resultOfCheck: boolean;
        message: string;
        priority: number;
    }[];
};

export type errorsMessagesType = {
    [key: string]: string | null;
};

export type ResultMessagesOfValidateType = {
    messages: errorsMessagesType;
    allIsPass: boolean;
};

export type ValidateRulesType = {
    [key in listOfValidateRule]: (
        arg?: string,
    ) => RegExp | { test: (arg2: string) => boolean };
};

export type StylesContextType = React.CSSProperties
