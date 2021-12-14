const clean = (str: string) => str.replace(/\D/g, '');

const switchFirstNumber = (str: string) => {
    const firstNumber = str[0];

    if (firstNumber === '9') return str.replace(/^9/, '+7 (9');
    if (firstNumber === '7' || firstNumber === '8') return str.replace(/^[7, 8]/, '+7 (');
    if (firstNumber === '+' && !str.includes('(') && clean(str).length >= 2) return str.replace(/[+]\d/, '$& (')
    return str.replace(/^\d/, '+$& (')
}

const CloseParentheses = (str: string) => {
    // +7 (963)2
    if (str.match(/^\+\d\s\(\d\d\d\)\d/)) {
        return str.replace(/^\+\d\s\(\d\d\d\)/, '$& ');
    }
    // +7 (9632
    if (str.match(/^\+\d\s\(\d\d\d\d/)) {
        return str.replace(/^\+\d\s\(\d\d\d/, '$&) ');
    }
    return str;
}

const AddHyphen = (str: string) => {    
    if (str.match(/^\+\d\s\(\d\d\d\)\s\d\d\d\d$/)) {
        return str.replace(/^\+\d\s\(\d\d\d\)\s\d\d\d/, '$&-');
    }
    if (str.match(/^\+\d\s\(\d\d\d\)\s\d\d\d-\d\d\d$/)) {
        return str.replace(/^\+\d\s\(\d\d\d\)\s\d\d\d-\d\d/, '$&-');
    }
    // если номер вставляют
    if (str.match(/^\+\d\s\(\d\d\d\)\s\d\d\d\d+$/)) {
        return str.replace(/^\+\d\s\(\d\d\d\)\s\d\d\d/, '$&-').replace(/^\+\d\s\(\d\d\d\)\s\d\d\d-\d\d/, '$&-');
    }
    return str;
}

const normalizePhone = (str: string) => {
    return AddHyphen(CloseParentheses(switchFirstNumber(str))).slice(0, 18);
};

export default normalizePhone;