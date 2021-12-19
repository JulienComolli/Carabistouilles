/**
 * Controller for "account" route
 * */
import Express from 'express';
import fileUpload from 'express-fileupload';

import { MAX_IMG_SIZE } from '../config/accountConfig.js';
import { getById, getPicturePath, deleteUser } from '../models/UserModel.js';
import { changeImage, changePassword } from '../controllers/AccountController.js'

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
    if (!req.files?.userimg)
        return res.redirect('/account');

    changeImage(req.session.user.id, req.files.userimg, (err) => {

        if (err)
            return res.render('account', { session: req.session, errors: err?.errors, picture_path: getPicturePath(req.session.user.id) });

        return res.redirect('account');
    });

});

AccountRoute.post('/delete', (req, res) => {
    // Check for missing input
    if (req.body?.password == "")
        return res.redirect('/account');

    try {
        console.log('Demande de suppression du compte #' + req.session.user.id + ' (' + req.session.user.username + ')');
        deleteUser(req.session.user.id, req.body.password);
        console.log('Compte #' + req.session.user.id + ' supprimé (' + req.session.user.username + ')')
        req.session.destroy()
        res.redirect('/');
    } catch (err) {
        res.redirect('/account');
    }

});

AccountRoute.post('/changepwd', (req, res) => {

    let usrId = req.session.user.id;
    let oldPass = req.body.oldPassword;
    let newPass = req.body.newPassword;
    let newPassConfirm = req.body.newPasswordConfirm;
    console.log(oldPass)
    changePassword(usrId, oldPass, newPass, newPassConfirm, (err) => {
        if(err)
            res.render('account', { session: req.session, showPassModal: "changePasswordModal", errors: err?.errors })
        else
            res.render('account', { session: req.session, showPassModal: null }); // avec les notifications succès
    });

});

export default AccountRoute;