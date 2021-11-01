import * as UserModel from "../models/UserModel.js";

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
    if (body.email != body.emailConfirm)
        errors.push({ message: 'Les adresses email ne correspondent pas !', input: 'emailConfirm' });

    if (body.password != body.passwordConfirm)
        errors.push({ message: 'Les mots de passe ne correspondent pas !', input: 'passwordConfirm' });

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