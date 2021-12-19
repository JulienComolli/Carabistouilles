export const EMAIL_MAX_SIZE = 320
export const USERNAME_MAX_SIZE = 20
export const USERNAME_MIN_SIZE = 4
export const PWD_MIN_LEN = 7
export const PWD_MAX_LEN = 64
export const PWD_REGEX = genRegex();

function genRegex() {
    let reg = '/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{PWD_MIN_LEN,PWD_MAX_LEN}$/';
    // Replacing placeholders
    reg = reg.replace('PWD_MAX_LEN', PWD_MAX_LEN); 
    reg = reg.replace('PWD_MIN_LEN', PWD_MIN_LEN);
    return new RegExp(reg); // Instantiating of the Regex
}

