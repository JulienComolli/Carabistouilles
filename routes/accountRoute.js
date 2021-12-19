/**
 * Controller for "account" route
 * */
import Express from 'express';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import mmmagic from 'mmmagic';
import { getRandomString } from '../modules/utils.js';

import { DEFAULT_USER_PICTUREPATH, AUTHORIZED_IMG_TYPES } from '../config/publicConfig.js';
import { MAX_IMG_SIZE } from '../config/accountConfig.js';
import { getById, getPicturePath, setPicturePath, deleteUser } from '../models/UserModel.js';

const AccountRoute = Express.Router();
const Magic = new mmmagic.Magic(mmmagic.MAGIC_MIME_TYPE); // MIME Type middleware

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

    // Missing files
    if (!req.files?.userimg)
        return res.redirect('/account');
    
    // Real MIME Type (Via mmmagic middleware)
    var extension = '.';
    
    Magic.detect(req.files.userimg.data, (err, type) => {
        if (err) return res.redirect('/account');

        if (Object.keys(AUTHORIZED_IMG_TYPES).includes(type)) 
            extension = AUTHORIZED_IMG_TYPES[type];
        else 
            return res.render('account', { session: req.session, errors: [{ message: 'Type de fichier interdit !', input: 'userimg' }], picture_path: getPicturePath(req.session.user.id) });

        // Generating a random 12 chars name + userid
        let newPic = getRandomString(12) + req.session.user.id + extension;

        // Move image to user profile picture
        req.files.userimg.mv('./public/img/users/' + newPic, (err) => {
            if (err) {
                console.error('Error while moving the file !');
                return res.render('/account', { session: req.session, errors: [{ message: 'An error occured while uploading your image !' }], picture_path: getPicturePath(req.session.user.id) });
            }

            // Delete old pic & change DB record
            let oldPic = getPicturePath(req.session.user.id);
            if (oldPic != DEFAULT_USER_PICTUREPATH) {
                fs.unlink('./public/img/users/' + oldPic, (err) => {
                    if (err)
                        return console.error('Error while deleting old picture !');
                });
            }
            setPicturePath(req.session.user.id, newPic);
        });

        res.redirect('account');
    });

});

AccountRoute.post('/delete', (req, res) => {
    // Check for missing input
    if(req.body?.password == "")
        return res.redirect('/account');
    
    try{
        console.log('Demande de suppression du compte #' + req.session.user.id + ' (' + req.session.user.username + ')');
        deleteUser(req.session.user.id, req.body.password);
        console.log('Compte #' + req.session.user.id + ' supprimé (' + req.session.user.username  + ')')
        req.session.destroy()
        res.redirect('/');
    }catch(err){
        res.redirect('/account');
    }
    
})

export default AccountRoute;