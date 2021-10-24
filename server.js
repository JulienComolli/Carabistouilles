// Node Modules Imports
import Database from "better-sqlite3";
import Express from "express";
import ExpressHandlebars from "express-handlebars";
import ExpressSession from "express-session";
import CookieParser from "cookie-parser";
import fs from "fs";

// Custom Imports
import { DBNAME, SERVER_PORT } from "./config/public-config.js";

import LoginRoute from "./routes/login-route.js";
import RegisterRoute from "./routes/register-route.js";

const SESSION_SECRET_KEY = "notverysecretkey"

// Init DB
if(!fs.existsSync(`./db/${DBNAME}`)){
    console.log('Setting up database structure ...');
    let db = new Database(`./db/${DBNAME}`);
    db.exec(fs.readFileSync('./db/scripts/createDb.sql', 'utf-8'));
    db.exec(fs.readFileSync('./db/scripts/populateDb.sql', 'utf-8'));
    db.close();
}
const DB = new Database(`./db/${DBNAME}`);

// Init Express server
const server = Express();
server.use(Express.static('public'));
server.use(CookieParser());
server.use(Express.urlencoded({ extended: true })); // Middleware for handling forms
server.use(ExpressSession({
    secret: SESSION_SECRET_KEY,
    saveUninitialized: true,
    cookie: { maxAge : 24 * 60 * 60 * 60 * 1000},
    resave: false
}));
server.engine('hbs', ExpressHandlebars({
    extname: '.hbs',
    helpers : {
        isInvalid : function(inputName, errorList){
            console.log(errorList);
            if(!errorList)
                return false;

            for(let index in errorList){
                if(errorList[index].input == inputName)
                    return true;
            }

            return false;
        },
        toJSON: function(obj){
            return JSON.stringify(obj);
        }
    }
}));
server.set('view engine',  'hbs');

// == Router ==
server.get('/', (req, res) => {
    res.render('home');
});

server.use('/login', LoginRoute(DB));
server.use('/register', RegisterRoute(DB));

server.get('/logout', (req, res) => {
    res.render('logout');
});

// Launching server

server.listen(SERVER_PORT, () => {
    console.log(`✅ Server started on port ${SERVER_PORT}`);
});