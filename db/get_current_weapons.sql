SELECT w.*, cw.attack_adj, cw.damage_adj, cw.character_id, cw.character_weapon_id FROM campaign as c
    JOIN campaign_character as cach ON cach.campaign_id = c.campaign_id
    JOIN character as ch ON ch.character_id = cach.character_id
    JOIN character_weapon as cw ON cw.character_id = ch.character_id
    JOIN weapon as w ON w.name = cw.weapon_name
    WHERE c.campaign_id = $1;