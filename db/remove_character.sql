DELETE FROM campaign_character
    WHERE campaign_id = $1 AND character_id = $2;