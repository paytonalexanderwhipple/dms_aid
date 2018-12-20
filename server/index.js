require('dotenv').config();
const { DB_CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, CLOUD_NAME, API_KEY, API_SECRET, DEV } = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const cloudinary = require('cloudinary');
const socket = require('socket.io');
const auth_ctrl = require('./controller/auth_controller.js');
const camp_ctrl = require('./controller/campaign_controller.js');
const char_ctrl = require('./controller/character_controller.js');
const middleware = require('./middleware.js');

const app = express();
const io = socket(app.listen(SERVER_PORT, () => console.log(`Listening on PORT: ${SERVER_PORT}`)));
// *** TOPLEVEL MIDDLEWARE *** //

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
massive(DB_CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
    });
app.use((req, res, next) => {
    if (DEV === 'true') {
        if (!req.session.user) {
            req.session.user = { username: '1', user_id: 1 };
            next();
        } else {
            next();
        }
    } else {
        next();
    }
})
// *** ENDPOINTS *** //

//---> auth
app.post('/auth/register', auth_ctrl.register);
app.post('/auth/login', auth_ctrl.login);
app.get('/auth/logout', auth_ctrl.logout);
//---> campaign data
app.post('/api/campaign', camp_ctrl.create);
// app.put('/api/campaign', camp_ctrl.update);
// app.delete('/api/campaign', camp_ctrl.delete);
app.get('/api/campaign', camp_ctrl.read);// returns all of the campaign info for basic display for the user on session
// app.get('/api/campaign/messages', camp_ctrl.readMessages);
// //---> character data
// app.post('/api/character', char_ctrl.create);
// app.put('/api/character', char_ctrl.update);
// app.delete('/api/character', char_ctrl.delete);

// *** SOCKET *** //

io.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log('disconnected')
    })
});