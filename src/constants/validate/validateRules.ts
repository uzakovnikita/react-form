import { ValidateRulesType } from '../../types/formic';
import { listOfValidateRule } from '../formic/enums';

const MIN_DATE = '2010-01-01';

const validateRules: ValidateRulesType = {
    [listOfValidateRule.REQUIRED]: () => /[.\S]/g,
    [listOfValidateRule.MAX_LENGTH]: (length: string = '50') =>
        new RegExp(`^.{0,${+length}}$`, 'g'),
    [listOfValidateRule.RUSSIANS_LETTERS_ONLY]: () => /[A-Za-z\d]/g,
    [listOfValidateRule.ENGLIS_LETTERS_ONLY]: () => /[А-Яа-яЁё]/g,
    [listOfValidateRule.HYPHEN_POSSIBLE_ONLY]: () => /[^\sA-Za-zА-Яа-яЁё-]/g,
    [listOfValidateRule.IS_EMAIL]: () => /^.+[^.]@[^.][^.]\..+$/g,
    [listOfValidateRule.CODE_OF_OPERATOR]: (codes: string = '127') =>
        new RegExp(`\\+\\d\\s\\([^${codes}]`, 'g'),
    [listOfValidateRule.NUMBERS_ONLY]: () => /^[\D]*$/g,
    [listOfValidateRule.TRUE_DATE]: () => ({
        test(date: string) {
            const [day, month, year] = date.split('.');
            let testDate = new Date(+year, +month === 12 ? 0 : +month, +day);
            const testDay = testDate.getDate();
            const testMotnh =
                testDate.getMonth() === 0 ? 12 : testDate.getMonth();
            const testYear = testDate.getFullYear();
            if (
                testDay === +day &&
                testMotnh === +month &&
                testYear === +year
            ) {
                return true;
            }
            return false;
        },
    }),
    [listOfValidateRule.MAX_DATE_IS_TODAY]: () => ({
        test(date: string) {
            const today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            const [recievedDay, recievedMonth, recievedYear] = date.split('.');
            const recievedDate = new Date(
                +recievedYear,
                +recievedMonth - 1,
                +recievedDay,
            );
            if (+recievedDate >= +today) return false;
            return true;
        },
    }),
    [listOfValidateRule.MIN_DATE]: (minimalDate: string = MIN_DATE) => ({
        test(date: string) {
            const minDate = new Date(minimalDate);
            minDate.setHours(0);
            minDate.setMinutes(0);
            minDate.setSeconds(0);
            const [recievedDay, recievedMonth, recievedYear] = date.split('.');
            const recievedDate = new Date(
                +recievedYear,
                +recievedMonth - 1,
                +recievedDay,
            );
            if (+recievedDate < +minDate) return false;
            return true;
        },
    }),
};

export const negativeTestRules = [
    listOfValidateRule.RUSSIANS_LETTERS_ONLY,
    listOfValidateRule.HYPHEN_POSSIBLE_ONLY,
    listOfValidateRule.NUMBERS_ONLY,
    listOfValidateRule.ENGLIS_LETTERS_ONLY,
];

export const priorityOfRules: { [key in keyof typeof validateRules]: number } =
    {
        [listOfValidateRule.REQUIRED]: 1,
        [listOfValidateRule.RUSSIANS_LETTERS_ONLY]: 2,
        [listOfValidateRule.ENGLIS_LETTERS_ONLY]: 2,
        [listOfValidateRule.NUMBERS_ONLY]: 3,
        [listOfValidateRule.HYPHEN_POSSIBLE_ONLY]: 3,
        [listOfValidateRule.TRUE_DATE]: 3,
        [listOfValidateRule.IS_EMAIL]: 4,
        [listOfValidateRule.CODE_OF_OPERATOR]: 4,
        [listOfValidateRule.MIN_DATE]: 4,
        [listOfValidateRule.MAX_DATE_IS_TODAY]: 4,
        [listOfValidateRule.MAX_LENGTH]: 5,
    };

export const otherConditionalForCheck: Partial<
    Record<listOfValidateRule, ((str: string) => boolean)[]>
> = {
    [listOfValidateRule.CODE_OF_OPERATOR]: [(str: string) => str.length > 4],
};

export default validateRules;
