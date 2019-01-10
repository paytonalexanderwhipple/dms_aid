DELETE FROM character_armor 
    WHERE character_id = $1 AND armor_name LIKE '%Shield';

INSERT INTO character_armor (character_id, armor_name, ac_adj)
    VALUES ($1, $2, 0);