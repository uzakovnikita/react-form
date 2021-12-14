export enum listOfTriggers {
    onClick = 'onClick',
    onSubmit = 'onSubmit',
    onFocus = 'onFocus',
    onChange = 'onChange'
};

export enum listOfNormalizeRule {
    name = 'name',
    email = 'email',
    phone = 'phone',
    date = 'date',
};

export enum listOfValidateRule {
    REQUIRED = 'REQUIRED',
    RUSSIANS_LETTERS_ONLY = 'RUSSIANS_LETTERS_ONLY',
    ENGLIS_LETTERS_ONLY = 'ENGLIS_LETTERS_ONLY',
    NUMBERS_ONLY = 'NUMBERS_ONLY',
    HYPHEN_POSSIBLE_ONLY = 'HYPHEN_POSSIBLE_ONLY',
    IS_EMAIL = 'IS_EMAIL',
    CODE_OF_OPERATOR = 'CODE_OF_OPERATOR',
    TRUE_DATE = 'TRUE_DATE',
    MIN_DATE = 'MIN_DATE',
    MAX_DATE_IS_TODAY = 'MAX_DATE_IS_TODAY',
    MAX_LENGTH = 'MAX_LENGTH',
};
