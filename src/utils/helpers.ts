import {
    ConfigType,
    NormalizeConfigType,
    ValidateConfigType,
} from '../types/formic';

export const isFunction = (obj: any): obj is Function =>
    typeof obj === 'function';

export const deepPickFromConfig = <
    T extends 'normalize' | 'validates',
    K extends (T extends 'normalize' ? NormalizeConfigType : ValidateConfigType ),
>(
    config: ConfigType,
    name: T,
): K => {
    const result = {} as K;
    for (const fieldName in config) {
        if (typeof config[fieldName] === 'object' && (name in (config[fieldName] as object))) {
            result[fieldName] = config[fieldName][name];
        }
    }
    return result;
};
