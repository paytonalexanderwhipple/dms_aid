-----> fake users
-- 1, 1 (dm on fake campaigns)
-- 2, 2
-- 3, 3
-----> fake campaign
INSERT INTO campaign (name, img, class_restrictions, level_limits, description)
    VALUES ('1', '', 'false', 'false', 'described');
INSERT INTO campaign (name, img, class_restrictions, level_limits, description)
    VALUES ('2', '', 'true', 'false', 'described well with details');
INSERT INTO campaign (name, img, class_restrictions, level_limits, description)
    VALUES ('3', '', 'true', 'true', '');

INSERT INTO campaign_user (campaign_id, user_id, is_dm)
    VALUES (1, 1, 'true');
INSERT INTO campaign_user (campaign_id, user_id, is_dm)
    VALUES (1, 2, 'false');
INSERT INTO campaign_user (campaign_id, user_id, is_dm)
    VALUES (1, 3, 'false');
INSERT INTO campaign_user (campaign_id, user_id, is_dm)
    VALUES (2, 1, 'true');
INSERT INTO campaign_user (campaign_id, user_id, is_dm)
    VALUES (2, 2, 'false');
INSERT INTO campaign_user (campaign_id, user_id, is_dm)
    VALUES (3, 3, 'true');
-----> chars for fake campaign
INSERT INTO character (user_id, name, title, race, temp_level, temp_hp, alignment, stats, weight, height, age, sex, eyes, hair, description, inventory, treasure, coinage, notes, special_abilities, img)
    VALUES (2, 'name2', 'title1', 'Human', 0, 0, 'Neutral', '{12, 13, 15, 13, 18, 14}', 1000, 156, 12334, 'male', 'blue', 'blonde', '', '', '', '{0, 0, 0, 0, 0}', '', '', '');
INSERT INTO character (user_id, name, title, race, temp_level, temp_hp, alignment, stats, weight, height, age, sex, eyes, hair, description, inventory, treasure, coinage, notes, special_abilities, img)
    VALUES (3, 'name3', 'title2', 'Human', 0, 0, 'Neutral', '{12, 13, 15, 13, 18, 14}', 1000, 156, 12334, 'male', 'blue', 'blonde', '', '', '', '{0, 0, 0, 0, 0}', '', '', '');
INSERT INTO character (user_id, name, title, race, temp_level, temp_hp, alignment, stats, weight, height, age, sex, eyes, hair, description, inventory, treasure, coinage, notes, special_abilities, img)
    VALUES (2, 'name4', 'title3', 'Human', 0, 0, 'Neutral', '{12, 13, 15, 13, 18, 14}', 1000, 156, 12334, 'male', 'blue', 'blonde', '', '', '', '{0, 0, 0, 0, 0}', '', '', '');

INSERT INTO character_class (character_id, class_name, hp, xp)
    VALUES (1, 'Magic-User', '{2}', 123);
INSERT INTO character_class (character_id, class_name, hp, xp)
    VALUES (1, 'Fighter', '{8}', 123);
INSERT INTO character_class (character_id, class_name, hp, xp)
    VALUES (2, 'Magic-User', '{6, 3}', 3234);
INSERT INTO character_class (character_id, class_name, hp, xp)
    VALUES (3, 'Magic-User', '{1}', 231);

INSERT INTO campaign_character (campaign_id, character_id)
    VALUES (1, 2);
INSERT INTO campaign_character (campaign_id, character_id)
    VALUES (1, 1);
INSERT INTO campaign_character (campaign_id, character_id)
    VALUES (1, 3);
INSERT INTO campaign_character (campaign_id, character_id)
    VALUES (2, 2);