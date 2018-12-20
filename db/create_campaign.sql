INSERT INTO campaign (name, img, class_restrictions, level_limits, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING campaign_id;