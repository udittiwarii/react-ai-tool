export function checkHeading(str) {
    return /^(\*)(\*)(.*)\*$/.test(str)
}


export function Replacetostarh(str) {
    return str.replace(/^(\*)(\*)|(\*)$/g, '');

}

