SELECT j.*, c.name FROM users as u
    JOIN join_request_invite as j ON j.user_id = u.user_id
    JOIN campaign as c ON c.campaign_id = j.campaign_id
    WHERE j.request_type = 'invite' AND j.user_id = $1;