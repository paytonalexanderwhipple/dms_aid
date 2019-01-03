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
        let { name, cLass, alignment, cha, con, dex, int, str, wis, exeptionalStrength, proficiencies, race, startingGold, campaign_id } = req.body;
        const { user_id } = req.session.user;
        const db = req.app.get('db');
        startingGold = [0, 0, 0, startingGold, 0];
        const stats = [str, int, wis, dex, con, cha, exeptionalStrength];
        name = name.charAt(0).toUpperCase() + name.slice(1, ).toLowerCase();
        let character_id = 0;
        try {
            character_id = await db.create_new_character([user_id, name, race, alignment, stats, proficiencies, startingGold]);
        } catch(err) {
            res.status(409).send('Sorry that name is already taken.');
        }
        const classArr = cLass.split('/');
        for(cLass of classArr) {
            let hp = [];
            for (entry in req.body) {
                if (entry === `${cLass}hp` || entry === `${cLass}hp1` || entry === `${cLass}hp2`) {
                    hp.push(req.body[entry]);
                }
            }
            await db.create_character_class([character_id[0].character_id, cLass, hp]);
        }
        db.create_campaign_character([campaign_id, character_id[0].character_id]);
        res.sendStatus(201);
    },
};