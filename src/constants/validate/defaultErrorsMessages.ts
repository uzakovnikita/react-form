import { listOfValidateRule } from "../formic/enums";

const defaultErrorsMessages: { [key in listOfValidateRule]: string } = {
    [listOfValidateRule.REQUIRED]: 'Поле обязательно для заполнения',
    [listOfValidateRule.RUSSIANS_LETTERS_ONLY]: 'Только русские буквы',
    [listOfValidateRule.ENGLIS_LETTERS_ONLY]: 'Только английские буквы',
    [listOfValidateRule.NUMBERS_ONLY]: 'Только цифры',
    [listOfValidateRule.HYPHEN_POSSIBLE_ONLY]: 'Разрешен только знак дефиса',
    [listOfValidateRule.IS_EMAIL]: 'Некорректный email',
    [listOfValidateRule.CODE_OF_OPERATOR]: 'Код оператора не может начинаться с 1, 2, 7',
    [listOfValidateRule.TRUE_DATE]: 'Некорректная дата',
    [listOfValidateRule.MIN_DATE]: 'Дата слишком мала',
    [listOfValidateRule.MAX_DATE_IS_TODAY]: 'Дата не должна быть позднее сегодняшнего дня',
    [listOfValidateRule.MAX_LENGTH]: 'Превышено допустимое количество символов',
};

export default defaultErrorsMessages;
