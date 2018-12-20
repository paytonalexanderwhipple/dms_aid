/* Returns all basic character data (classes, levels) needed to display on the
landing page */

SELECT chcl.class_name, ch.character_id, c.campaign_id, cav.level FROM campaign_user as cu
    JOIN campaign as c on c.campaign_id=cu.campaign_id
    JOIN campaign_character as cc on cc.campaign_id=c.campaign_id
    JOIN character as ch on ch.character_id=cc.character_id
    JOIN character_class as chcl on chcl.character_id=ch.character_id
    JOIN class_abilities_variable as cav on chcl.class_name=cav.class_name
    WHERE cu.user_id = $1 and chcl.xp <@ cav.xp_range;
