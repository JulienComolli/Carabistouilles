import * as UserModel from '../models/UserModel.js';

export default function (body, req = null) {

    var errs;

    if((errs = checkMissingInputs(body)) != null)
        throw errs;

    if(req.session.authenticated)
        throw { type : 'alreadyLoggedIn'}

    // Search email
    let id;
    if((id = UserModel.getId('email', body.email)) == null)
        throw { type : 'wrongEmail', errors : [{ input : 'email', message : 'Cet email ne correspond à aucun utilisateur !'}]}

    // Password check
    if(!UserModel.correctPassword(id, body.password))
        throw { type : 'wrongPassword', errors : [{ input : 'password', message : 'Mot de passe incorrect !'}]}

    // Login complete
    UserModel.loginUser(body.email, body.password, req);

}

function checkMissingInputs(body) {

    var verificationTable = [
        {
            input: 'email',
            value: body.email,
            message: 'Veuillez tapez votre adresse email'
        },
        {
            input: 'password',
            value: body.password,
            message: 'Veuillez tapez votre mot de passe'
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