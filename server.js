// Node Modules Imports
import Database from "better-sqlite3";
import Express from "express";
import ExpressHandlebars from "express-handlebars";
import fs, { appendFile } from "fs";

// Custom Imports
import { DBNAME, SERVER_PORT } from "./config/public-config.js";

// Init DB
const DB = new Database(`./db/${DBNAME}`);

// Init Express server
const server = Express();
server.use(Express.static('public'));
server.engine('hbs', ExpressHandlebars({extname: '.hbs'}));
server.set('view engine',  'hbs');

// Routes
server.get('/', (req, res) => {
    res.render('home');
});

server.get('/login', (req, res) => {
    res.render('login');
});

server.get('/register', (req, res) => {
    res.render('register');
});

server.get('/logout', (req, res) => {
    res.send('Vous êtes à présent déconnecté ! <a href="/">Retour à l\'accueil</a>');
});


server.listen(SERVER_PORT, () => {
    console.log(`✅ Server started on port ${SERVER_PORT}`);
});