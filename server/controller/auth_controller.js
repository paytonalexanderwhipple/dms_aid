const bcrypt = require('bcryptjs');

module.exports={
login: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const result = await db.check_for_user([username]);
        if (result[0]) {
            const correctPassword = bcrypt.compareSync(password, result[0].hash_value);
            if (correctPassword) {
                req.session.user = { username: result[0].username, user_id: result[0].user_id };
                res.sendStatus(200);
            } else {
                res.status(401).send('Incorrect Password');
            }
        } else {
            res.status(404).send('Username does not exist');
        }
    },
    register: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const result = await db.check_for_user([username]);
        if (!result[0]) {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);
            const user = await db.users.insert({username, hash_value: hash});
            req.session.user = { username: user.username, user_id: user.user_id };
            res.sendStatus(201);
        } else {
            res.status(409).send('This user already exists');
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
}