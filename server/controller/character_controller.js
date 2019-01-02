let statParser = require('./stat_parsers.js');

module.exports = {
    import_character: async (req, res) => {
        let { name, campaign_id } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get('db');
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const character = await db.character.findOne({name});
        if (character) {
            if (character.user_id === user_id) {
                let isParticipating = await db.campaign_character.findOne({campaign_id, character_id: character.character_id});
                if (!isParticipating) {
                    await db.create_campaign_character([campaign_id, character.character_id]);
                    res.sendStatus(201);
                } else {
                    res.status(409).send('That character is already in the campaign');
                }
            } else {
                res.status(401).send('That is not your character');
            }
        } else {
            res.status(404).send('Sorry we could not find a character with that name');
        }
    },
    creation_data: async(req, res) => {
        const db = req.app.get('db');
        const classes = await db.get_class_data();
        const races = await db.get_race_data();
        const weapons = await db.get_weapon_data();
        const ammo = await db.get_ammo_data();
        const armor = await db.get_armor_data();
        res.status(200).send({classes, races, weapons, ammo, armor});
    },
    create: async (req, res) => {
        const { name, cLass, alignment, cha, con, dex, int, str, wis, proficiencies, race, startingGold } = req.body;
        const db = req.app.get('db');
    },
};