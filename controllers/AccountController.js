import fileUpload from 'express-fileupload';
import fs from 'fs';
import mmmagic from 'mmmagic';
const Magic = new mmmagic.Magic(mmmagic.MAGIC_MIME_TYPE); // MIME Type middleware

import { getPicturePath, setPicturePath } from '../models/UserModel.js';
import { DEFAULT_USER_PICTUREPATH, AUTHORIZED_IMG_TYPES } from '../config/publicConfig.js';
import { getRandomString } from '../modules/utils.js';


/**
 * Change the user image
 * @param {Number} id User's id
 * @param {fileUpload.UploadedFile} userimg New image
 * @param {callback} callback 
 */
export function changeImage(id, userimg, callback) {

    // Real MIME Type (Via mmmagic middleware)
    var extension = '.';
    
    Magic.detect(userimg.data, (err, type) => {
        if (err) return callback({errors : []});

        if (Object.keys(AUTHORIZED_IMG_TYPES).includes(type)) 
            extension = AUTHORIZED_IMG_TYPES[type];
        else 
            return callback({errors: [{ message: 'Type de fichier interdit !', input: 'userimg' }]})

        // Generating a random 12 chars name + userid
        let newPic = getRandomString(12) + id + extension;

        // Move image to user profile picture
        userimg.mv('./public/img/users/' + newPic, (err) => {
            if (err) {
                console.error('Error while moving the file !');
                return callback({errors: [{ message: 'An error occured while uploading your image !' }]});
            }

            // Delete old pic & change DB record
            let oldPic = getPicturePath(id);
            if (oldPic != DEFAULT_USER_PICTUREPATH) {
                fs.unlink('./public/img/users/' + oldPic, (err) => {
                    if (err)
                        return console.error('Error while deleting old picture !');
                });
            }
            setPicturePath(id, newPic);
        });

        return callback(null);
    });

}