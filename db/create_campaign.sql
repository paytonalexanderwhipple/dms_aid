INSERT INTO campaign (name, img, level_limits, description)
    VALUES ($1, $2, $3, $4)
    RETURNING campaign_id;