/* Returns a shallow copy of character data associated with the campaigns connected to a
specific user */

SELECT ch.character_id, ch.name, ch.title, ch.race, ch.stats, c.campaign_id FROM campaign_user as cu
    JOIN campaign as c on c.campaign_id=cu.campaign_id
    JOIN campaign_character as cc on cc.campaign_id = c.campaign_id
    JOIN character as ch on ch.character_id=cc.character_id
    WHERE cu.user_id = $1;