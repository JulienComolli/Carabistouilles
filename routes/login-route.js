import Express from 'express';
import Bcrypt from 'bcrypt';

export default function factory(DB){

    const LoginRoute = Express.Router();

    LoginRoute.use('/', (req, res, next) => {

        if(req.session.authenticated){
            res.redirect('account');
            return;
        }

        next();        
    });

    LoginRoute.get('/', (req, res) => {
        res.render('login');
    });

    LoginRoute.post('/', (req, res) => {
        let body = req.body;
        var errorList = [];

        // Check all parameters are present
        if(!body.email || body.email.trim() == '')
            errorList.push({message: 'Veuillez indiquer une adresse email',input: 'email'});

        if(!body.password || body.password.trim() == '')
            errorList.push({message: 'Veuillez indiquer un mot de passe',input: 'password'});


        // Must improve this part
        if(errorList.length == 0){

            let error = login(body.email, body.password, req, DB);

            if(error)
                errorList.push(error);

        }

        if(errorList.length != 0){
            res.render('login', {
                errors : errorList,
                inputValues: body
            });
        }else{
            res.redirect('/');
        }

    });

    return LoginRoute;

}

/**
 * 
 * @param {String} email 
 * @param {String} password Password
 * @param {Express.Request} req
 * @param {import('better-sqlite3').Database} DB 
 */
function login(email, password, req, DB){

    let sqlQuery = DB.prepare('SELECT id,username,pass FROM Users WHERE email=?').bind([email]).get();

    if(!sqlQuery)
        return {message: 'L\'email est incorrect',input: 'email'};
                
    let matchPassword = Bcrypt.compareSync(password, sqlQuery.pass);

    if(!matchPassword)
        return {message: 'Le mot de passe est incorrect',input: 'password'};

    // Login the user
    req.session.authenticated = true;
    req.session.user = {
        id: sqlQuery.id,
        username: sqlQuery.username
    }

    return undefined;

}