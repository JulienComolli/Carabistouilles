import Express from 'express';
import Bcrypt from 'bcrypt';
import { SALT_ROUND } from '../config/public-config.js';

export default function factory(DB){
    const RegisterRoute = Express.Router();

    RegisterRoute.get('/', (req, res) => {
        res.render('register');
    });

    RegisterRoute.post('/', (req, res) => {

        let body = req.body;
        let errors = checkMissingInputs(body);

        if(body.email != body.emailConfirm)
            errors.push({message: 'Les adresses email ne correspondent pas !', input: 'emailConfirm'});

        if(body.password != body.passwordConfirm)
            errors.push({message: 'Les mots de passe ne correspondent pas !', input: 'passwordConfirm'});

        if(errors.length == 0){
            // Checking if username is already used
            if(usernameTaken(body.username, DB))
                errors.push({message: 'Ce pseudonyme est déjà utilisé !', input:'username'});

            // Checking if email is already used
            if(emailTaken(body.email, DB))
                errors.push({message: 'Cette adresse email est déjà utilisée !', input:'email'});
        }
                
        if(errors.length != 0){
            res.render('register', {
                errors : errors,
                inputValues: body
            });
        }else{
            let registerErrors = registerUser(body.username, body.email, body.password, DB);
            res.redirect('/');
        }
    });

    return RegisterRoute;
}

/**
 * Check if a given username is already taken
 * @param {String} username 
 * @param {import('better-sqlite3').Database} DB 
 * @returns True : The username is already taken, else False
 */
function usernameTaken(username, DB){
    let req = DB.prepare('SELECT 1 FROM Users WHERE LOWER(username)=LOWER(?)').bind([username]).get();

    if(req)
        return true;
    else
        return false;
}

/**
 * Check if a given username is already taken
 * @param {String} email 
 * @param {import('better-sqlite3').Database} DB 
 * @returns True : The username is already taken, else False
 */
 function emailTaken(email, DB){
    let req = DB.prepare('SELECT 1 FROM Users WHERE LOWER(email)=LOWER(?)').bind([email]).get();

    if(req)
        return true;
    else
        return false;
}

/**
 * 
 * @param {String} username Username of the new user
 * @param {String} email Email of the new user
 * @param {String} password Password (not hashed) of the new user
 * @param {import('better-sqlite3').Database} DB SQLite database 
 */
function registerUser(username, email, password, DB) {

    // Password hashing using bcrypt
    let hashedPassword = Bcrypt.hashSync(password, Bcrypt.genSaltSync(SALT_ROUND));
    
    let result = DB.prepare('INSERT INTO Users (username, email, pass) VALUES (?,?,?)').run([username, email, hashedPassword]);

    console.log(result);
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
    let errors = [];

    verificationTable.forEach(verif => {

        if(!verif.value || verif.value.trim() == ''){
            errors.push({
                input: verif.input,
                message: verif.message
            })
        }
    })

    return errors;

}