const normalizeName = (name: string) => {
    if (name.split(' ').length > 3) {
        
        return name.trim();
    }
    return name
        .split(/\s+/)
        .map((word) => {
            if (word.trim().length > 0) {
                return word[0].toUpperCase() + word.substring(1);
            }
            return word;
        })
        .join(' ');
};
export default normalizeName;
