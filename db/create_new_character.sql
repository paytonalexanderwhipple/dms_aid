INSERT INTO character (user_id, name, title, race, temp_hp, alignment, stats, saving_throw_adj, proficiencies, languages, weight, height, age, sex, eyes, hair, description, inventory, treasure, coinage, notes, dm_notes, special_abilities, img)
    VALUES ($1, $2, '', $3, 0, $4, $5, 0, $6, '{}', 0, 0, 0, '', '', '', '', '', '', $7, '', '', '', '')
    RETURNING character_id;


