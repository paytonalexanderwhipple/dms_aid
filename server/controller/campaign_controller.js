const stat_parsers = require('./stat_parsers.js');

module.exports = {
    read: async (req, res) => {
        const { user_id } = req.session.user;
        const db = req.app.get('db');
        const campaignArray = await db.user_campaign([user_id]);
        const characterArray = await db.user_campaign_character([user_id]);
        const characterDetails = await db.user_campaign_character_class([user_id]);
        const fullCharacterArray = await Promise.all(characterArray.map( async character => {
            let classDetails = [];
            await Promise.all(characterDetails.map(async cLass => {
                if (cLass.character_id === character.character_id && cLass.campaign_id === character.campaign_id) {
                    let levelLimits;
                    for (campaign of campaignArray) {
                        if (character.campaign_id === campaign.campaign_id) {
                            levelLimits = campaign.level_limits;
                        }
                    }
                    if (levelLimits) {
                        levelLimit = stat_parsers.checkLevelLimit(character, cLass);
                        if (cLass.level > levelLimit) {
                            const newLevel = await db.get_class_by_level_shallow([cLass.class_name, levelLimit]);
                            cLass = Object.assign(cLass, newLevel[0]);
                        }
                    };
                    classDetails.push(cLass); 
                }
            }));
            return { ...character, classDetails };
        }))
        let fullCampaignArray = campaignArray.map(campaign => {
            let characters = [];
            fullCharacterArray.forEach(character => {
                if (character.campaign_id === campaign.campaign_id) characters.push(character);
            })
            return { ...campaign, characters };
        })
        res.status(200).send(fullCampaignArray);
    },
    create: async (req, res) => {
        const { campaignName, text, levelLimits, description } = req.body;
        const db = req.app.get('db');
        try {
            const newCampaign = await db.create_campaign([ campaignName, text, levelLimits, description ]);
            await db.create_campaign_user([newCampaign[0].campaign_id, req.session.user.user_id, true]);
            res.sendStatus(201);
        } catch(err) {
            res.status(409).send('Name already in use');
        }
    },
    createJoin: async (req, res) => {
        const { campaignName, text} = req.body;
        const { user_id } = req.session.user
        const db = req.app.get('db');
        const campaign = await db.campaign.findOne({name: campaignName});
        if (!campaign) {
            res.status(404).send('That campaign does not exist. (yet), or you just mispelled the name.');
            return ''
        }
        const isParticipating = await db.check_for_campaign_participation([user_id, campaign.campaign_id]);
        if (!isParticipating[0]) {
            await db.create_join_invite([ campaign.campaign_id, user_id, 'join', text ]);
            res.sendStatus(201);
        } else {
            if (isParticipating[0].is_dm) {
                res.status(409).send('You are already participating in this campaign. In fact you are incharge.');
            } else {
                res.status(409).send('You are already participating in this campaign');
            }
        }
    },
    createInvite: async (req, res) => {
        const { username, message, campaign_id } = req.body;
        const db = req.app.get('db');
        const user = await db.users.find({username: username});
        if (user[0]) {
            const isParticipating = await db.check_for_campaign_participation([user[0].user_id, campaign_id])
            if (!isParticipating[0]) {
                await db.create_join_invite([ campaign_id, user[0].user_id,'invite', message ]);
                res.sendStatus(201);
            } else {
                res.status(409).send('They are already participating in this campaign');
            }
        } else {
            res.status(404).send('That username does not exist');
        }
    },
    getCurrentCampaign: async (req, res) => {
        const { campaign_id } = req.query;
        const { user_id } = req.session.user;
        const db = req.app.get('db');
        const campaignData = await db.get_current_campaign([campaign_id, user_id]);
            const users = await db.get_current_users([campaign_id]);
            const inviteJoin = await db.get_current_invites([campaign_id]);
            const messages = await db.get_current_messages([campaign_id]);
        const characterData = await db.get_current_characters([campaign_id, user_id]);
            const classData = await db.get_current_classes([campaign_id, user_id]);
            let weapons = await db.get_current_weapons([campaign_id, user_id]);
                const ammo = await db.get_current_ammo([campaign_id, user_id]);
            const armor = await db.get_current_armor([campaign_id, user_id]);
            const items = await db.get_current_items([campaign_id]);
        weapons = weapons.map(weapon => {
            const ammoDetails = [];
            ammo.forEach(ammo => {
                if (ammo.character_weapon_id == weapon.character_weapon_id) {
                    ammoDetails.push(ammo);
                }
            })
            return { ...weapon, ammoDetails }
        })
        let counter = 0
        const characterDetails = await Promise.all(characterData.map(async character => {
        const classDetails = [];
        character.classes = [];
        for (cLass of classData) {
            let pushClass = {...cLass};
            if (cLass.character_id === character.character_id) {
                character.classes.push(cLass.class_name);
                if (campaignData[0].level_limits) {
                    levelLimit = stat_parsers.checkLevelLimit(character, cLass);
                    if (cLass.level > levelLimit) {
                        const newLevel = await db.get_class_by_level([cLass.class_name, levelLimit]);
                        pushCLass = Object.assign(pushClass, newLevel[0]);
                    }
                };
                classDetails.push(pushClass);
            };
        }
            const weaponDetails = [];
            weapons.forEach(weapon => {
                if (weapon.character_id === character.character_id) weaponDetails.push(weapon)
            })
            const armorDetails = [];
            armor.forEach(armor => {
                if (armor.character_id === character.character_id) armorDetails.push(armor)
            });
            const itemList = [];
            items.forEach(item => {
                if (item.character_id === character.character_id) itemList.push(item);
            })
            character = { ...character, classDetails, weaponDetails, armorDetails, itemList };
            character = stat_parsers.racialStatParser(character);
            const [ str, int, wis, dex, con, cha, execptionalStrength ] = character.stats;
            character.str = stat_parsers.str(str, character.classes, execptionalStrength);
            character.int = stat_parsers.int(int);
            character.wis = stat_parsers.wis(wis);
            character.dex = stat_parsers.dex(dex);
            character.con = stat_parsers.con(con, character.classes);
            character.cha = stat_parsers.cha(cha);
            if (character.classDetails.length > 1) {
                if (character.race === 'Human') {
                    character = stat_parsers.dualClassParser(character);
                } else {
                    character = stat_parsers.multiClassParser(character);
                }
            } else {
                character = stat_parsers.classParser(character);
            };
            const { race } = character;
            if (race === 'Dwarf' || race === 'Gnome' || race === 'Halfling') {
                character = stat_parsers.racialSavingThrows(character, con);
            };
            return character;
        }));
        campaign = { user_id, campaignDetails: campaignData[0], characterDetails, inviteJoin, messages, users };
        res.status(200).send(campaign);
    },
    update: async(req, res) => {
        const { name, img, level_limits, description } = req.body;
        const { campaign_id } = req.params;
        const db = req.app.get('db');
        const update = { name, img, level_limits, description }
        db.campaign.update({campaign_id}, update)
            .then(results => {
                res.status(200).send(results[0]);
            }).catch(err => {
                console.log(err);
                res.status(409).send('Name already in use');
            });
    },
    delete: async(req, res) => {
        const { campaign_id } = req.params;
        const db = req.app.get('db');
        await db.delete_campaign([campaign_id]);
        res.sendStatus(200);
    },
    leave_campaign: async(req, res) => {
        const { campaign_id } = req.query;
        const { user_id } = req.session.user;
        const db = req.app.get('db');
        await db.leave_campaign([ campaign_id, user_id ]);
        res.sendStatus(200);
    },
    removePlayer: async(req, res) => {
        const { campaign_user_id, campaign_id, user_id } = req.query;
        console.log(campaign_id, user_id);
        const db = req.app.get('db');
        await db.campaign_user.destroy({campaign_user_id});
        await db.remove_characters([campaign_id, user_id]);
        res.sendStatus(200);
    }
}