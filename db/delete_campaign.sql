DELETE FROM campaign_character
    WHERE campaign_id = $1;
DELETE FROM campaign_user
    WHERE campaign_id = $1;
DELETE FROM messages 
    WHERE campaign_id = $1;
DELETE FROM join_request_invite
    WHERE campaign_id = $1;
DELETE FROM campaign
    WHERE campaign_id = $1;