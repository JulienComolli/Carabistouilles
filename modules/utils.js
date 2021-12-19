export function getRandomString(length = 12) {

    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet += alphabet.toLowerCase();
    alphabet += '0123456789';

    let randomString = '';

    for (let i = 0; i < length; i++)
        randomString += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    return randomString;
}