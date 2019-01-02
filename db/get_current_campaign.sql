SELECT c.campaign_id, c.name, c.img, c.level_limits, c.description, cu.is_dm FROM campaign as c
    JOIN campaign_user as cu ON c.campaign_id = cu.campaign_id
    WHERE c.campaign_id = $1 AND cu.user_id = $2;