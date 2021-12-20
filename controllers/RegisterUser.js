import * as UserModel from '../models/UserModel.js';
import { PWD_MIN_LEN, USERNAME_MIN_SIZE, USERNAME_MAX_SIZE } from '../config/accountConfig.js';
import { validatePassword } from '../modules/utils.js';

export default function (body) {
    var errs;

    // Si l'une des deux fonctions renvoie des erreurs on les jette
    if ((errs = checkMissingInputs(body)) != null) {
        throw errs;
    };
    if ((errs = validateInputs(body)) != null) {
        throw errs;
    }

    // Sinon on enregistre l'utilisateur
    UserModel.registerUser(body.username, body.email, body.password);
    return true;
}


function checkMissingInputs(body) {

    var verificationTable = [
        {
            input: 'username',
            value: body.username,
            message: 'Veuillez indiquer un pseudonyme'
        },
        {
            input: 'email',
            value: body.email,
            message: 'Veuillez indiquer une adresse email'
        },
        {
            input: 'emailConfirm',
            value: body.emailConfirm,
            message: 'Veuillez confirmer votre adresse email'
        },
        {
            input: 'password',
            value: body.password,
            message: 'Veuillez indiquer un mot de passe'
        },
        {
            input: 'passwordConfirm',
            value: body.passwordConfirm,
            message: 'Veuillez confirmer votre mot de passe'
        }
    ]
    let errors = [];

    verificationTable.forEach(verif => {

        if (!verif.value || verif.value.trim() == '') {
            errors.push({
                input: verif.input,
                message: verif.message
            })
        }
    })

    return errors.length == 0 ? null : { type: 'missingInputs', errors };

}

function validateInputs(body) {
    let errors = [];

    if (body.username.length < USERNAME_MIN_SIZE || body.username.length > USERNAME_MAX_SIZE)
        errors.push({
            message: `Votre nom d'utilisateur doit être compris entre ${USERNAME_MIN_SIZE} et ${USERNAME_MAX_SIZE} caractères !`, input: 'username'
        });
    
    if (body.email != body.emailConfirm)
        errors.push({ message: 'Les adresses email ne correspondent pas !', input: 'emailConfirm' });

    // If there is errors we end the function before processing the Regex
    if (errors.length != 0)
        return errors.length == 0 ? null : { type: 'invalidInputs', errors };

    if (body.password != body.passwordConfirm)
        errors.push({ message: 'Les mots de passe ne correspondent pas !', input: 'passwordConfirm' });
    
    if (!validatePassword(body.password)) {
        errors.push({
            message:
                `Le mot de passe doit contenir au moins ${PWD_MIN_LEN} caractères, une majuscule, un nombre et un caractère spécial !`,
            input: 'password'
        });
        errors.push({ message: '', input: 'passwordConfirm'})
        return { type: 'invalidInputs', errors };
    }


    if (errors.length == 0) {
        // Checking if username is already used
        if (UserModel.usernameTaken(body.username))
            errors.push({ message: 'Ce pseudonyme est déjà utilisé !', input: 'username' });

        // Checking if email is already used
        if (UserModel.emailTaken(body.email))
            errors.push({ message: 'Cette adresse email est déjà utilisée !', input: 'email' });
    }

    return errors.length == 0 ? null : { type: 'invalidInputs', errors };

}