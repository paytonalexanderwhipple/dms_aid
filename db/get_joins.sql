SELECT j.*, u.username FROM join_request_invite as j
    JOIN users as u ON u.user_id = j.user_id
    WHERE j.campaign_id = $1 AND j.request_type = 'join';