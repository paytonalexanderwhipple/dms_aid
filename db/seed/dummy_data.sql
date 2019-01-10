-----> fake users
-- 1, 1 (dm on fake campaigns)
-- 2, 2
-- 3, 3
-----> fake campaign
INSERT INTO campaign (name, img, level_limits, description)
    VALUES ('campaign 1', '', 'false', 'described');
INSERT INTO campaign (name, img, level_limits, description)
    VALUES ('campaign 2', '', 'false', 'described well with details');
INSERT INTO campaign (name, img, level_limits, description)
    VALUES ('campaign 3', '', 'true', '');

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

--> dummy invites
INSERT INTO join_request_invite (campaign_id, user_id, request_type, message)
    VALUES (3, 1, 'invite', 'Lets go man!!!!');
    
--> join requests
INSERT INTO join_request_invite (campaign_id, user_id, request_type, message)
    VALUES (1, 4, 'join', 'Im so exited!!!');

-----> chars for fake campaign
INSERT INTO character (user_id, name, title, race, alignment, stats, saving_throw_adj, ac_bonus, proficiencies, languages, weight, height, age, sex, eyes, hair, description, inventory, coinage, notes, dm_notes, special_abilities, img)
    VALUES (2, 'Elrohir', '', 'Half-Elf', 'Neutral Good', '{18, 15, 11, 9, 18, 10, 55}', 5, 1, '{Long-Sword, Long-Bow, Sling, Spear}', '{}', 1900, 172, 35134, 'male', 'blue', 'blonde', '', '', '{0, 0, 123, 0, 0}', '', '', '', '');
INSERT INTO character (user_id, name, title, race, alignment, stats, saving_throw_adj, ac_bonus, proficiencies, languages, weight, height, age, sex, eyes, hair, description, inventory, coinage, notes, dm_notes, special_abilities, img)
    VALUES (3, 'Darin', 'Presdidigitator', 'Human', 'Chaotic Evil', '{5, 13, 15, 8, 4, 14, 0}', 2, 0, '{Staff}', '{}', 1050, 156, 12334, 'male', 'blue', 'blonde', '', '', '{510, 2000, 501, 5000, 200}', '', '', '', '');
INSERT INTO character (user_id, name, title, race, alignment, stats, saving_throw_adj, ac_bonus, proficiencies, languages, weight, height, age, sex, eyes, hair, description, inventory, coinage, notes, dm_notes, special_abilities, img)
    VALUES (2, 'Shmargris', 'Butt kicker', 'Dwarf', 'Chaotic Neutral', '{18, 5, 12, 17, 18, 7, 0}', 0, 0, '{Dagger, Heavy-War-Hammer, Light-War-Hammer, Two-Handed-Sword}', '{}', 900, 105, 12334, 'male', 'blue', 'blonde', '', '', '{230, 120, 1, 24, 10}', '', '', '', '');

INSERT INTO character_class (character_id, class_name, hp, xp, og_class)
    VALUES (1, 'Magic-User', '{2}', 2123, 'true');
INSERT INTO character_class (character_id, class_name, hp, xp, og_class)
    VALUES (1, 'Fighter', '{8, 9}', 2123, 'true');
INSERT INTO character_class (character_id, class_name, hp, xp, og_class)
    VALUES (2, 'Magic-User', '{6, 3, 3, 4, 5}', 30234, 'true');
INSERT INTO character_class (character_id, class_name, hp, xp, og_class)
    VALUES (2, 'Assassin', '{0, 0, 0, 0, 0}', 3234, 'false');
INSERT INTO character_class (character_id, class_name, hp, xp, og_class)
    VALUES (3, 'Thief', '{4}', 231, 'true');

INSERT INTO campaign_character (campaign_id, character_id)
    VALUES (1, 2);
INSERT INTO campaign_character (campaign_id, character_id)
    VALUES (1, 1);
INSERT INTO campaign_character (campaign_id, character_id)
    VALUES (1, 3);
INSERT INTO campaign_character (campaign_id, character_id)
    VALUES (2, 2);
--> weapons
INSERT INTO character_weapon (character_id, weapon_name, attack_adj, damage_adj)
    VALUES (1, 'Long-Sword', 3, 3);
INSERT INTO character_weapon (character_id, weapon_name, attack_adj, damage_adj)
    VALUES (1, 'Long-Bow', 2, 1);
INSERT INTO character_weapon (character_id, weapon_name, attack_adj, damage_adj)
    VALUES (1, 'Club', 0, 0);
INSERT INTO character_weapon (character_id, weapon_name, attack_adj, damage_adj)
    VALUES (1, 'Dagger', 0, 0);
INSERT INTO character_weapon (character_id, weapon_name, attack_adj, damage_adj)
    VALUES (1, 'Sling', 0, 0);
INSERT INTO character_weapon (character_id, weapon_name, attack_adj, damage_adj)
    VALUES (2, 'Staff', 0, 0);
INSERT INTO character_weapon (character_id, weapon_name, attack_adj, damage_adj)
    VALUES (3, 'Dagger', 0, 0);
-->ammo
INSERT INTO character_weapon_ammo (character_weapon_id, ammo_name, attack_adj, damage_adj, quantity)
    VALUES (2, 'Long-Bow-Arrow', -1, 0, 12);
INSERT INTO character_weapon_ammo (character_weapon_id, ammo_name, attack_adj, damage_adj, quantity)
    VALUES (5, 'Sling-Stone', 0, 0, 20);
INSERT INTO character_weapon_ammo (character_weapon_id, ammo_name, attack_adj, damage_adj, quantity)
    VALUES (5, 'Sling-Bullet', 0, 0, 7);
INSERT INTO character_weapon_ammo (character_weapon_id, ammo_name, attack_adj, damage_adj, quantity)
    VALUES (7, 'Dagger', 0, 0, 5);

--> armor
INSERT INTO character_armor (character_id, armor_name, ac_adj)
    VALUES (1, 'Chain', 0);
INSERT INTO character_armor (character_id, armor_name, ac_adj)
    VALUES (1, 'Large-Shield', 0);
INSERT INTO character_armor (character_id, armor_name, ac_adj)
    VALUES (2, 'None', 0);
INSERT INTO character_armor (character_id, armor_name, ac_adj)
    VALUES (2, 'No-Shield', 0);
INSERT INTO character_armor (character_id, armor_name, ac_adj)
    VALUES (3, 'None', 0);
INSERT INTO character_armor (character_id, armor_name, ac_adj)
    VALUES (3, 'No-Shield', 0);

--> items
INSERT INTO item (name, encumbrance, character_id, campaign_id)
    VALUES ('Backpack', 20, 1, 1);
INSERT INTO item (name, encumbrance, character_id, campaign_id)
    VALUES ('Bag Of Holding', 500, 1, 1);
INSERT INTO item (name, encumbrance, character_id, campaign_id)
    VALUES ('Big Rock', 2000, 1, 1);
INSERT INTO item (name, encumbrance, character_id, campaign_id)
    VALUES ('Chalk', 0, 1, 1);
INSERT INTO item (name, encumbrance, character_id, campaign_id)
    VALUES ('Cloak', 50, 1, 1);