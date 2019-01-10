SELECT u.username, cu.campaign_user_id, cu.user_id, cu.campaign_id, cu.is_dm FROM campaign_user as cu
    JOIN users as u ON u.user_id = cu.user_id
    WHERE cu.campaign_id = $1;