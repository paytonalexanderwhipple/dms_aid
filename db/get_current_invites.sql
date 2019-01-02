SELECT j.* FROM campaign as c
    JOIN join_request_invite as j ON j.campaign_id = c.campaign_id
    WHERE c.campaign_id = $1 AND j.request_type = 'join';