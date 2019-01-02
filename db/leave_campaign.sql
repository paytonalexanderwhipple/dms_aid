DELETE FROM campaign_user
    WHERE campaign_id = $1 AND user_id = $2;
DELETE FROM campaign_character
    