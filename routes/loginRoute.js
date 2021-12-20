import Express from 'express';
import LoginUser from '../controllers/LoginUser.js';
import { addNotification, getNotifications, Notification } from '../controllers/NotificationController.js';

const LoginRoute = Express.Router();

LoginRoute.use('/', (req, res, next) => {

    if (req.session.authenticated) {
        res.redirect('account');
        return;
    }

    next();
});

LoginRoute.get('/', (req, res) => {
    res.render('login', {session: req.session});
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

    addNotification(req.session, new Notification('Connecté', 'Vous êtes à présent connecté !'));
    res.redirect('/account');

});

export default LoginRoute;