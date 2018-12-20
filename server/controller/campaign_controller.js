module.exports = {
    read: async (req, res) => {
        const { user_id } = req.session.user;
        const db = req.app.get('db');
        const campaignArray = await db.user_campaign([user_id]);
        const characterArray = await db.user_campaign_character([user_id]);
        const characterDetails = await db.user_campaign_character_class([user_id]);
        const fullCharacterArray = characterArray.map(character => {
            let classDetails = [];
            characterDetails.forEach(details => {
                if (details.character_id === character.character_id && details.campaign_id === character.campaign_id) {
                classDetails.push(details);
                }
            })
            return { ...character, classDetails };
        })
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
        const { campaignName, text, classRestrictions, levelLimits, description } = req.body;
        const db = req.app.get('db');
        const newCampaign = await db.create_campaign([ campaignName, text, classRestrictions, levelLimits, description ]);
        await db.create_campaign_user([newCampaign[0].campaign_id, req.session.user.user_id, true]);
        res.sendStatus(201);
    },
    delete: async (req, res) => {

    },
}