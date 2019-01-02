SELECT cav.class_name, caf.min_stats, caf.bonus_xp_stats, caf.weapons, caf.hd_type, caf.alignment_restriction, cav.hd, cav.proficiencies FROM class_abilities_fixed as caf
    JOIN class_abilities_variable as cav ON cav.class_name = caf.class_name
    WHERE cav.level = 1;