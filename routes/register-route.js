import Express from 'express';

export default function factory(DB){
    const RegisterRoute = Express.Router();

    RegisterRoute.get('/', (req, res) => {
        res.render('register');
    });

    RegisterRoute.post('/', (req, res) => {

        let body = req.body;
        var errorList = checkMissingInputs(body);

        if(body.password != 'password'){
            errorList.push({
                message: 'Mot de passe incorrect',
                input: 'password'
            });
        }

        if(errorList.length != 0){
            res.render('register', {
                errors : errorList
            });
        }else{
            res.redirect('/');
        }
    });

    return RegisterRoute;
}

function checkMissingInputs(body){

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
    var errorList = [];

   verificationTable.forEach(verif => {

        if(!verif.value || verif.value.trim() == ''){
            errorList.push({
                input: verif.input,
                message: verif.message
            })
        }
    })

    return errorList;

}