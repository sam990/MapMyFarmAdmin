const undefinedParser = value => value ? value : "";
const emptyStringParser = value => value.length === 0 || value === ' ' ? "-" : value;

export default function textParser(str) {
    return emptyStringParser(undefinedParser(str));
}