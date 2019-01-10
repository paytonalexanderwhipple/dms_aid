SELECT ch.*, cach.campaign_id, r.add_languages, r.vision, r.special_attack, r.detections, r.resistances, r.base_movement, r.special_movement, r.thief_adj, r.stat_adj, r.racial_languages FROM campaign as c
    JOIN campaign_character as cach ON cach.campaign_id = c.campaign_id
    JOIN character as ch ON ch.character_id = cach.character_id
    JOIN race as r ON r.name = ch.race
    WHERE c.campaign_id = $1;