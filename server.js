// Node Modules Imports
import Express from "express";


// Custom Imports
import { SERVER_PORT } from "./config/public-config.js";

import session from "./modules/session.js"
import handleBars from "./modules/handleBars.js";

import LoginRoute from "./routes/login-route.js";
import RegisterRoute from "./routes/register-route.js";



// Init Express server
const server = Express();
server.use(Express.static('public'));
server.use(Express.urlencoded({ extended: true })); // Middleware for handling forms

server.use(session);
server.engine('hbs', handleBars);
server.set('view engine',  'hbs');

// == Router ==
server.get('/', (req, res) => {
    res.render('home', { session : req.session });
});

server.use('/login', LoginRoute);
server.use('/register', RegisterRoute);

server.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

server.get('/account', (req, res) => {
    res.render('account', { session : req.session });
});

// Launching server

server.listen(SERVER_PORT, () => {
    console.log(`✅ Server started on port ${SERVER_PORT}`);
});