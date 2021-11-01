import Express from 'express';
import RegiserUser from "../controllers/RegisterUser.js"

const RegisterRoute = Express.Router();

RegisterRoute.get('/', (req, res) => {
    res.render('register');
});

RegisterRoute.post('/', (req, res) => {

    try {
        RegiserUser(req.body);
    } catch (e) {
        if (e.type == 'missingInputs') {
            return res.render('register', { errors: e.errors, inputValues: req.body });
        } else if (e.type == 'invalidInputs') {
            return res.render('register', { errors: e.errors, inputValues: req.body });
        } else {
            return console.error(e);
        }
    }

    res.send("Bravo vous êtes inscrit !");

});

export default RegisterRoute;



