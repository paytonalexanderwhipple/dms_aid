INSERT INTO character (user_id, name, title, race, alignment, stats, saving_throw_adj, ac_bonus, proficiencies, languages, weight, height, age, sex, eyes, hair, description, inventory, coinage, notes, dm_notes, special_abilities, img)
    VALUES ($1, $2, '', $3, $4, $5, 0, 0, $6, '{}', 0, 0, 0, '', '', '', '', '', $7, '', '', '', '')
    RETURNING character_id;


