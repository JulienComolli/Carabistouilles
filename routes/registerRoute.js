import Express from 'express';
import { addNotification, Notification } from '../controllers/NotificationController.js';
import RegiserUser from '../controllers/RegisterUser.js';

const RegisterRoute = Express.Router();

RegisterRoute.get('/', (req, res) => {
    res.render('register');
});

RegisterRoute.post('/', (req, res) => {

    try {
        RegiserUser(req.body);
    } catch (e) {
        if (e.type == 'missingInputs' || e.type == 'invalidInputs') {
            return res.render('register', { errors: e.errors, inputValues: req.body });
        } else {
            return console.error(e);
        }
    }

    addNotification(req.session, new Notification('Inscription réussie', 'Vous êtes inscrit, vous pouvez dès à présent vous connecter !', 'success'));
    res.redirect('login');

});

export default RegisterRoute;



