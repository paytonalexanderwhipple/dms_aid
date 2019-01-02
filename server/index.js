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
const io = socket();
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
        app.listen(SERVER_PORT, () => console.log(`Listening on PORT: ${SERVER_PORT}`))
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
// ---> campaign data
app.post('/api/campaign', camp_ctrl.create);
app.get('/api/campaign/list', camp_ctrl.read);// returns all of the campaign info for basic display for the user on session
app.get('/api/campaign', camp_ctrl.getCurrentCampaign);
app.put('/api/campaign/:campaign_id', camp_ctrl.update);
app.delete('/api/campaign/delete/:campaign_id', camp_ctrl.delete);
app.post('/api/campaign/invite', camp_ctrl.createInvite);
app.delete('/api/campaign/leave', camp_ctrl.leave_campaign);
app.post('/api/campaign/join', camp_ctrl.createJoin);
// ---> character data
app.post('/api/character/import', char_ctrl.import_character);
app.get('/api/character/creation', char_ctrl.creation_data)
app.post('/api/character', char_ctrl.create);
// app.put('/api/character', char_ctrl.update);
// app.delete('/api/character', char_ctrl.delete);
//---> invites/join requests
app.get('/api/invites', async (req, res) => {
    const { user_id } = req.session.user;
    const db = req.app.get('db');
    const invites = await db.get_invites_by_user([user_id]);
    res.status(200).send(invites);
})
app.post('/api/invites', async (req, res) => {
    const { user_id } = req.session.user;
    const { name, id } = req.body;
    const db = req.app.get('db');
    const campaign = await db.campaign.findOne({name});
    await db.create_campaign_user([campaign.campaign_id, user_id, false]);
    await db.delete_request([id]);
    res.sendStatus(201);
})
app.delete('/api/requests/:id', async (req, res) => {
    const { id } = req.params;
    const db = req.app.get('db');
    await db.delete_request([id]);
    res.sendStatus(200);
})
app.get('/api/requests/:campaign_id', async (req, res) => {
    const { campaign_id } = req.params;
    const db = req.app.get('db');
    const joins = await db.get_joins([campaign_id]);
    res.status(200).send(joins);
})
app.post('/api/requests', async(req, res) => {
    const { campaign_id, user_id, join_request_id } = req.body;
    const db = req.app.get('db');
    db.create_campaign_user([campaign_id, user_id, false]);
    db.delete_request([join_request_id]);
    res.sendStatus(201);
})

// *** SOCKET *** //

io.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log('disconnected')
    })
});