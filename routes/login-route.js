import Express from 'express';
import Bcrypt from 'bcrypt';

export default function factory(DB){

    const LoginRoute = Express.Router();

    LoginRoute.get('/', (req, res) => {
        res.render('login');
    });

    LoginRoute.post('/', (req, res) => {
        let body = req.body;
        var errorList = [];

        // Check all parameters are present
        if(!body.email || body.email.trim() == ''){
            errorList.push({
                message: 'Veuillez indiquer une adresse email',
                input: 'email'
            });
        }

        if(!body.password || body.password.trim() == ''){
            errorList.push({
                message: 'Veuillez indiquer un mot de passe',
                input: 'password'
            });
        }

        if(errorList.length == 0){

            let sqlQuery = DB.prepare('SELECT pass FROM Users WHERE email=?').bind([body.email]).get();

            if(!sqlQuery){
                errorList.push({
                    message: 'L\'email est incorrect',
                    input: 'email'
                });
            }else{
                
                var matchPassword = Bcrypt.compareSync(body.password, sqlQuery.pass);

                if(!matchPassword){
                    errorList.push({
                        message: 'Le mot de passe est incorrect',
                        input: 'password'
                    });
                }

            }
            
        }

        if(errorList.length != 0){
            res.render('login', {
                errors : errorList
            });
        }else{
            res.redirect('/');
        }

    });

    return LoginRoute;

}