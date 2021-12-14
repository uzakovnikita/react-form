const normalizeDate = (str: string) => {
    if (/^\d\d\d$/.test(str)) {
        return str.replace(/^\d\d/, '$&.');
    }
    if (/^\d\d\.\d\d\d$/.test(str)) {
        return str.replace(/^\d\d\.\d\d/, '$&.');
    }
    // если дату вставляют
    if (/^\d\d+$/.test(str)) {
        return str.replace(/^(\d\d)(\d\d)/, '$1.$2.');
    }
    return str.slice(0, 10);
};

export default normalizeDate;
