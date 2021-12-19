import { PWD_MAX_LEN, PWD_REGEX } from '../config/accountConfig.js'
export function getRandomString(length = 12) {

    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet += alphabet.toLowerCase();
    alphabet += '0123456789';

    let randomString = '';

    for (let i = 0; i < length; i++)
        randomString += alphabet.charAt(Math.floor(Math.random() * alphabet.length));

    return randomString;
}

export function validatePassword(password) {
    return password.length < PWD_MAX_LEN && password.match(PWD_REGEX)
}