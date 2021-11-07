import Bcrypt from "bcrypt";
const SALT_ROUND = 10;

import DB from "../modules/dbConn.js";

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