// Node Modules Imports
import Express from "express";

// Custom Imports
import { SERVER_PORT } from "./config/serverConfig.js";

import session from "./modules/session.js"
import handleBars from "./modules/handleBars.js";

import LoginRoute from "./routes/loginRoute.js";
import RegisterRoute from "./routes/registerRoute.js";
import AccountRoute from './routes/accountRoute.js';

import './models/UserModel.js';

// Init Express server
const server = Express();

server.use(Express.urlencoded({ extended: true, limit: '20kb'})); // Middleware for handling forms
server.use(Express.static('public'));

server.use(session);
server.engine('hbs', handleBars);
server.set('view engine',  'hbs');

// == Router ==
server.get('/', (req, res) => {
    res.render('home', { session : req.session });
});

server.use('/login', LoginRoute);
server.use('/register', RegisterRoute);
server.use('/account', AccountRoute);

server.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Launching server

server.listen(SERVER_PORT, () => {
    console.log(`✅ Server started on port ${SERVER_PORT}`);
});