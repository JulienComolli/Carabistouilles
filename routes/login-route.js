import Express from 'express';
import LoginUser from '../controllers/LoginUser.js';

const LoginRoute = Express.Router();

LoginRoute.use('/', (req, res, next) => {

    if (req.session.authenticated) {
        res.redirect('account');
        return;
    }

    next();
});

LoginRoute.get('/', (req, res) => {
    res.render('login');
});

LoginRoute.post('/', (req, res) => {

    try{
        LoginUser(req.body, req);
    }catch(e){

        if(e.type == 'missingInputs' || e.type == 'wrongEmail' || e.type == 'wrongPassword')
            res.render('login', { errors: e.errors, inputValues: req.body });
        else
            res.render('login', { errors : [{message : 'Une erreur est survenue'}], inputValues : req.body} )
        
        return
    }

    res.redirect('/account');

});

export default LoginRoute;