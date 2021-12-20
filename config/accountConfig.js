export const MAX_IMG_SIZE =  1 * 1024* 1024;
export const EMAIL_MAX_SIZE = 320
export const USERNAME_MAX_SIZE = 20
export const USERNAME_MIN_SIZE = 4
export const PWD_MIN_LEN = 7
export const PWD_MAX_LEN = 128
export const PWD_REGEX = genRegex();
export const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

function genRegex() {
    let reg = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{PWD_MIN_LEN,PWD_MAX_LEN}$';
    // Replacing placeholders
    reg = reg.replace('PWD_MAX_LEN', PWD_MAX_LEN); 
    reg = reg.replace('PWD_MIN_LEN', PWD_MIN_LEN);
    return new RegExp(reg); // Instantiating of the Regex
}

