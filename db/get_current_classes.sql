SELECT ch.character_id, cach.campaign_id, cav.*, caf.*, cc.hp, cc.xp, cc.og_class FROM campaign as c
    JOIN campaign_character as cach ON cach.campaign_id = c.campaign_id
    JOIN character as ch ON ch.character_id = cach.character_id
    JOIN character_class as cc ON cc.character_id = ch.character_id
    JOIN class_abilities_fixed as caf ON caf.class_name = cc.class_name
    JOIN class_abilities_variable as cav ON cav.class_name = cc.class_name
    WHERE c.campaign_id = $1 AND cc.xp <@ cav.xp_range;