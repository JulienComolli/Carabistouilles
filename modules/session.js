import ExpressSession from 'express-session';

import { SESSION_SECRET_KEY } from '../config/serverConfig.js';


const SessionStore = new ExpressSession.MemoryStore();

const expSess = ExpressSession({
    secret: SESSION_SECRET_KEY,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 60 * 1000 },
    resave: false,
    SessionStore
});

export default expSess;