SELECT ca.character_id, ca.ac_adj, a.name, a.encumbrance, a.max_move, a.ac_mod FROM campaign as c
    JOIN campaign_character as cach ON cach.campaign_id = c.campaign_id
    JOIN character as ch ON ch.character_id = cach.character_id
    JOIN character_armor as ca ON ca.character_id = ch.character_id
    JOIN armor as a ON a.name = ca.armor_name
    WHERE c.campaign_id = $1;