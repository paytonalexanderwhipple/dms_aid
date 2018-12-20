/* Returns all of the basic data for the campaigns associated 
associated with a given user. Should be chained with user_campaign_caracter.sql
 */

SELECT c.campaign_id, u.user_id, c.name, c.img, c.class_restrictions, c.level_limits, c.description, cu.is_dm FROM campaign_user as cu
    JOIN campaign as c on c.campaign_id=cu.campaign_id
    JOIN users as u on u.user_id=cu.user_id
    WHERE cu.user_id = $1;
