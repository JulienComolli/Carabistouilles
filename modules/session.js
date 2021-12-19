import ExpressSession from 'express-session';

const SessionStore = new ExpressSession.MemoryStore();
const SESSION_SECRET_KEY = "notverysecretkey"

const expSess = ExpressSession({
    secret: SESSION_SECRET_KEY,
    saveUninitialized: false,
    cookie: { maxAge : 24 * 60 * 60 * 60 * 1000},
    resave: false,
    SessionStore
});

export default expSess;