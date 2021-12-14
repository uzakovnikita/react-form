import normalizeDate from './normalizeDate';
import normalizeName from './normalizeName';
import normalizePhone from './normalizePhone';

const normalize = (fieldName: string, value: string) => {
    const str = String(value);
    if (str.length === 0) {
        return ''
    }
    switch (fieldName) {
        case 'name':
            return normalizeName(str);
        case 'phone':
            return normalizePhone(str);
        case 'date':
            return normalizeDate(str);
        default:
            break;
    }
    return str;
};

export default normalize;
