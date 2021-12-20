/**
 * Controller for "account" route
 * */
import Express from 'express';
import fileUpload from 'express-fileupload';

import { MAX_IMG_SIZE } from '../config/accountConfig.js';
import { getById, getPicturePath, deleteUser } from '../models/UserModel.js';
import { changeImage, changePassword } from '../controllers/AccountController.js';
import { addNotification, Notification } from '../controllers/NotificationController.js';

const AccountRoute = Express.Router();

// Authentication check (middleware)
AccountRoute.use('', (req, res, next) => {
    if (!req.session.authenticated)
        return res.redirect('login');

    next();
});

// Middleware handling file upload (Only on account page)
AccountRoute.use(fileUpload({
    limits: MAX_IMG_SIZE,
    useTempFiles: false,
    safeFileNames: true,
    abortOnLimit: true,
    preserveExtension: true
}));

AccountRoute.get('', (req, res) => {
    let user = getById(req.session.user.id);
    res.render('account', { session: req.session, user: user, picture_path: getPicturePath(req.session.user.id) });
});

AccountRoute.post('/', (req, res) => {

    // Missing inputs
    if (!req.files?.userimg){
        addNotification(req.session, new Notification('Erreur', 'Vous devez fournir une image !', 'error'))
        return res.redirect('/account');
    }

    changeImage(req.session.user.id, req.files.userimg, (err) => {

        if (err)
            return res.render('account', { session: req.session, errors: err?.errors, picture_path: getPicturePath(req.session.user.id) });

        addNotification(req.session, new Notification('Nouvel avatar', 'Votre avatar a bien été modifié !', 'success'));
        return res.redirect('account');
    });

});

AccountRoute.post('/delete', (req, res) => {
    // Check for missing input
    if (req.body?.password == "")
        return res.redirect('/account');

    try {
        deleteUser(req.session.user.id, req.body.password);
        console.log('Compte #' + req.session.user.id + ' supprimé (' + req.session.user.username + ')')
        req.session.regenerate((err) => {
            addNotification(req.session, new Notification('Compte supprimé', 'Votre compte a été supprimé !', 'success'));
            res.redirect('/');
        });
    } catch (err) {
        addNotification(req.session, new Notification('Erreur', 'Mot de passe éronné', 'error'));
        res.redirect('/account');
    }

});

AccountRoute.post('/changepwd', (req, res) => {

    let usrId = req.session.user.id;
    let oldPass = req.body.oldPassword;
    let newPass = req.body.newPassword;
    let newPassConfirm = req.body.newPasswordConfirm;

    changePassword(usrId, oldPass, newPass, newPassConfirm, (err) => {
        if(err){
            return res.render('account', { session: req.session, showPassModal: "changePasswordModal", errors: err?.errors })
        }else{
            addNotification(req.session, new Notification('Modification enregitrée', 'Votre mot de passe a bien été modifié !', 'success'));
            return res.redirect('account');
        }
    });

});

export default AccountRoute;