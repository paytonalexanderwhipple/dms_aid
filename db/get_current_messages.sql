SELECT m.* FROM campaign as c
    JOIN messages as m ON m.campaign_id = c.campaign_id
    WHERE c.campaign_id = $1;