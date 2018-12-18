require('dotenv').config();
const { DB_CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, CLOUD_NAME, API_KEY, API_SECRET } = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bcrypt = require('bcryptjs');
const auth_ctrl = require('./controller/auth_controller.js');
const char_ctrl = require('./controller/character_controller.js');
const camp_ctrl = require('./controller/campaign_controller.js');

const app = express();
// *** TOPLEVEL MIDDLEWARE *** //

app.use(express.json);
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
massive(DB_CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
    });

// *** ENDPOINTS *** //

//---> auth
app.post('/auth/register', auth_ctrl.register);
app.post('/auth/login', auth_ctrl.login);
app.get('/auth/logout', auth_ctrl.logout);