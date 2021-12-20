import Bcrypt from "bcrypt";
const SALT_ROUND = 10;
import { DEFAULT_USER_PICTUREPATH } from '../config/serverConfig.js';

import DB from "../modules/dbConn.js";
 
// Getters

/**
 * 
 * @param {*} id 
 * @returns 
 */
export function getById(id) {
    let user = DB.prepare('SELECT * FROM Users WHERE id=?').bind([id]).get();
    return user != undefined ? user : null;
}

export function getId(field, value) {
    let id = DB.prepare(`SELECT id FROM Users WHERE ${field}=?`).pluck().get(value);
    return id;
}

/**
 * 
 * @param {*} field 
 * @param {*} value 
 * @returns 
 */
export function getByField(field, value) {
    let user = DB.prepare(`SELECT * FROM Users WHERE ${field}=?`).pluck().get(value);
    return user != undefined ? user : null;
}

export function getPicturePath(id) {
    let req = DB.prepare('SELECT picture_path FROM Users WHERE id=?').bind([id]).get();
    return req.picture_path != null ? req.picture_path : DEFAULT_USER_PICTUREPATH;
}

/**
 * Set the profile picture path (Null for default)
 * @param {*} id User id
 * @param {*} path Path of the picture in the user pics folder
 */
export function setPicturePath(id, path = NULL) {
    if(path == null || path == undefined || path == 'default')
        path = 'NULL';

    DB.prepare('UPDATE Users SET picture_path=? WHERE id=?').run([path, id]);
}

// Register

/**
 * 
 * @param {String} username Username of the new user
 * @param {String} email Email of the new user
 * @param {String} password Password (not hashed) of the new user
 */
export function registerUser(username, email, password) {
    // Password hashing using bcrypt
    const hashedPassword = Bcrypt.hashSync(password, Bcrypt.genSaltSync(SALT_ROUND));
    DB.prepare('INSERT INTO Users (username, email, pass) VALUES (?,?,?)').run([username, email, hashedPassword]);
}

// Login

/**
 * Logs in the user corresponding to the given email and password
 * @param {*} email 
 * @param {*} password 
 */
export function loginUser(email, password, req) {

    // If user exists
    let id;
    if((id = getId('email', email)) == null)
        return

    // Login the user
    let user = getById(id)
    req.session.authenticated = true;
    req.session.user = {
        id: user.id,
        username: user.username
    }

}

// Account deletion

/**
 * Delete the user's account if the password is correct
 * @param {number} id 
 * @param {string} password 
 */
export function deleteUser(id, password){
    if(!correctPassword(id, password))
        throw Error('Incorrect password')
    
    DB.prepare('DELETE FROM Users WHERE id=?;').run([id])
}

// Basic checks

/**
 * Check if the given password matches user's password
 * @param {Number} id User's id
 * @returns True : Password match, else False
 */
export function correctPassword(id, password){
    let req = DB.prepare('SELECT pass FROM Users WHERE id=?').bind([id]).get();
    if(req)
        return Bcrypt.compareSync(password, req.pass);
    
    return false;
}

export function updatePassword(id, newPassword) {
    DB.prepare('UPDATE Users SET pass=? WHERE id=?').run([hashPassword(newPassword), id]);
    return true;
}

/**
 * Check if a given username is already taken
 * @param {String} username 
 * @returns True : The username is already taken, else False
 */
export function usernameTaken(username) {
    let req = DB.prepare('SELECT 1 FROM Users WHERE LOWER(username)=LOWER(?)').bind([username]).get();
    return (req != undefined || null) ? true : false;
}

/**
 * Check if a given username is already taken
 * @param {String} email 
 * @returns True : The username is already taken, else False
 */
export function emailTaken(email) {
    let req = DB.prepare('SELECT 1 FROM Users WHERE LOWER(email)=LOWER(?)').bind([email]).get();
    return (req != undefined || null) ? true : false;
}

export function getAll() {
    let res = DB.prepare('SELECT * FROM Users').all();
    return (res != undefined || null) ? res : null;
}


function hashPassword(password) {
    return Bcrypt.hashSync(password, Bcrypt.genSaltSync(SALT_ROUND));
}