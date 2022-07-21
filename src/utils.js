export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function noscript(strCode) {
    return strCode.replace(/<script.*?>.*?<\/script>/gim, "");
}