DELETE from campaign_character
    where campaign_id = 1 AND character_id IN (select character_id from character 
    where user_id = 2);