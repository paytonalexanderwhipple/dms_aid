-----> class_abilities_fixed
--> magic user 
INSERT INTO class_abilities_fixed (name, min_stats, bonus_xp_stats, weapons, armor, non_proficiency_penalty, hd)
    VALUES ('Magic-User', '{3, 6, 9, 6, 6, 6}', '{3, 16, 6, 6, 6, 6}', '{dagger, dart, oil, staff}', '{}', 5, 4);
--> Fighter
INSERT INTO class_abilities_fixed (name, min_stats, bonus_xp_stats, weapons, armor, non_proficiency_penalty, hd)
    VALUES ('Fighter', '{9, 3, 6, 6, 7, 6}', '{16, 3, 6, 6, 7, 6}', '{any}', '{any}', 2, 10);
-----> class_abilities_variable
--> magic user
INSERT INTO class_abilities_variable (class_name, level, xp_range, spells, thief_skills, turn_undead, thac, saving_throws, proficiencies, special_abilities, hd, hp_bonus)
    VALUES ('Magic-User', 1, '[0, 2400]', '{1, 0, 0, 0, 0, 0, 0, 0, 0}', '{}', '{}', '{11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20, 20, 20, 20, 21, 22, 23, 24, 25, 26}', '{11, 15, 14, 13, 12}', 2, '', 1, 0);
INSERT INTO class_abilities_variable (class_name, level, xp_range, spells, thief_skills, turn_undead, thac, saving_throws, proficiencies, special_abilities, hd, hp_bonus)
    VALUES ('Magic-User', 2, '[2401, 4800]', '{2, 0, 0, 0, 0, 0, 0, 0, 0}', '{}', '{}', '{11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20, 20, 20, 20, 21, 22, 23, 24, 25, 26}', '{11, 15, 14, 13, 12}', 2, '', 2, 0);
--> Fighter
INSERT INTO class_abilities_variable (class_name, level, xp_range, spells, thief_skills, turn_undead, thac, saving_throws, proficiencies, special_abilities, hd, hp_bonus)
    VALUES ('Fighter', 1, '[0, 1900]', '{}', '{}', '{}', '{10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 20 ,20, 20, 20, 21, 22, 23, 24, 25}', '{16, 17, 14, 15, 17}', 4, '', 1, 0);
-----> race 
INSERT INTO race (name, vision, special_abilities, detections, resistances, base_movement, special_movement, thief_adj, stat_adj, min_stats, max_stats, add_languages, starting_age, classes)
    VALUES ('Human', 'normal', '', '', '', 12, '', '{}', '{}', '{}', '{}', 10, '{20+1d4, 15+1d4, 24+2d8, 20+d4}', '{15, 20, 14, 20, 20, 20, 20, 20, 20}');
