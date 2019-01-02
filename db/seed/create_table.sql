
DROP TABLE IF EXISTS "users" CASCADE;
CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"username" varchar(50) NOT NULL UNIQUE,
	"hash_value" TEXT NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "messages" CASCADE;
CREATE TABLE "messages" (
	"message_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"campaign_id" integer NOT NULL,
	"text" varchar(144) NOT NULL,
	"is_image" BOOLEAN NOT NULL,
	"likes" integer NOT NULL,
	"dislikes" integer NOT NULL,
	CONSTRAINT messages_pk PRIMARY KEY ("message_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "character" CASCADE;
CREATE TABLE "character" (
	"character_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"title" varchar(50) NOT NULL,
	"race" text NOT NULL,
	"temp_hp" integer NOT NULL,
	"alignment" varchar(20) NOT NULL,
	"stats" integer[] NOT NULL,
	"saving_throw_adj" integer NOT NULL,
	"proficiencies" text[] NOT NULL,
	"languages" text[] NOT NULL,
	"weight" integer NOT NULL,--in gp (lbs*10)
	"height" integer NOT NULL,--in inches
	"age" integer NOT NULL,--in days the front end will do the convertion
	"sex" varchar(10) NOT NULL,
	"eyes" varchar(25) NOT NULL,
	"hair" varchar(25) NOT NULL,
	"description" varchar(144) NOT NULL,
	"inventory" varchar(500) NOT NULL,
	"treasure" varchar(500) NOT NULL,
	"coinage" integer[] NOT NULL,--array containing cp, sp, ep, gp, pp.
	"notes" TEXT NOT NULL,
	"dm_notes" TEXT NOT NULL,
	"special_abilities" TEXT NOT NULL,
	"img" TEXT NOT NULL,
	CONSTRAINT character_pk PRIMARY KEY ("character_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "item" CASCADE;
CREATE TABLE "item" (
	"name" VARCHAR(30) NOT NULL,
	"encumbrance" integer NOT NULL,
	"character_id" integer NOT NULL,
	"campaign_id" integer NOT NULL,
	"item_id" serial NOT NULL,
	CONSTRAINT item_pk PRIMARY KEY ("item_id")
) WITH (
	OIDS=FALSE
);

DROP TABLE IF EXISTS "campaign" CASCADE;
CREATE TABLE "campaign" (
	"campaign_id" serial NOT NULL,
	"name" varchar(144) NOT NULL UNIQUE,
	"img" TEXT NOT NULL,
	"level_limits" BOOLEAN NOT NULL,
	"description" VARCHAR(144) NOT NULL,
	CONSTRAINT campaign_pk PRIMARY KEY ("campaign_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "campaign_character" CASCADE;
CREATE TABLE "campaign_character" (
	"campaign_id" integer NOT NULL,
	"character_id" integer NOT NULL,
	"campaign_character_id" serial NOT NULL,
	CONSTRAINT campaign_character_pk PRIMARY KEY ("campaign_character_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "campaign_user" CASCADE;
CREATE TABLE "campaign_user" (
	"campaign_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"is_dm" BOOLEAN NOT NULL,
	"campaign_user_id" serial NOT NULL,
	CONSTRAINT campaign_user_pk PRIMARY KEY ("campaign_user_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "class_abilities_fixed" CASCADE;
CREATE TABLE "class_abilities_fixed" (
	"class_name" TEXT NOT NULL,
	"min_stats" integer[] NOT NULL,
	"bonus_xp_stats" integer[] NOT NULL,
	"weapons" text[] NOT NULL,
	"armor" text[] NOT NULL,
	"non_proficiency_penalty" integer NOT NULL,
	"hd_type" integer NOT NULL,
	"primary_stat" text NOT NULL,
	"alignment_restriction" text[] NOT NULL,
	CONSTRAINT class_abilities_fixed_pk PRIMARY KEY ("class_name")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "race" CASCADE;
CREATE TABLE "race" (
	"name" TEXT NOT NULL,
	"vision" TEXT NOT NULL,
	"special_abilities" TEXT NOT NULL,
	"detections" TEXT NOT NULL,
	"resistances" TEXT NOT NULL,
	"base_movement" integer NOT NULL,
	"special_movement" TEXT NOT NULL,
	"thief_adj" integer[] NOT NULL,
	"stat_adj" integer[] NOT NULL,
	"min_stats" integer[] NOT NULL,
	"max_stats" integer[] NOT NULL,
	"add_languages" integer NOT NULL,
	"starting_age" text[] NOT NULL,
	"class_options" text[] NOT NULL,
	"racial_languages" text[] NOT NULL,
	CONSTRAINT race_pk PRIMARY KEY ("name")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "weapon" CASCADE;
CREATE TABLE "weapon" (
	"name" TEXT NOT NULL,
	"damage_small_medium" TEXT NOT NULL,
	"damage_large" TEXT NOT NULL,
	"ammo_types" TEXT[] NOT NULL,
	"encumbrance" integer NOT NULL,
	CONSTRAINT weapon_pk PRIMARY KEY ("name")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "ammo" CASCADE;
CREATE TABLE "ammo" (
	"type" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"damage_small_medium" TEXT NOT NULL,
	"damage_large" TEXT NOT NULL,
	"rate_of_fire" TEXT NOT NULL,
	"range" integer NOT NULL,
	"encumbrance" integer NOT NULL,
	CONSTRAINT ammo_pk PRIMARY KEY ("type")
) WITH (
	OIDS=FALSE
);

DROP TABLE IF EXISTS "character_weapon_ammo" CASCADE;
CREATE TABLE "character_weapon_ammo" (
	"character_weapon_id" integer NOT NULL,
	"ammo_name" TEXT NOT NULL,
	"character_weapon_ammo_id" serial NOT NULL,
	"attack_adj" integer NOT NULL,
	"damage_adj" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT character_weapon_ammo_pk PRIMARY KEY ("character_weapon_ammo_id")
) WITH (
	OIDS=FALSE
);


DROP TABLE IF EXISTS "character_weapon" CASCADE;
CREATE TABLE "character_weapon" (
	"character_id" integer NOT NULL,
	"weapon_name" TEXT NOT NULL,
	"character_weapon_id" serial NOT NULL,
	"attack_adj" integer NOT NULL,
	"damage_adj" integer NOT NULL,
	"is_proficient" BOOLEAN NOT NULL,
	CONSTRAINT character_weapon_pk PRIMARY KEY ("character_weapon_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "character_armor" CASCADE;
CREATE TABLE "character_armor" (
	"character_id" integer NOT NULL,
	"armor_name" TEXT NOT NULL,
	"character_armor_id" serial NOT NULL,
	"ac_adj" integer NOT NULL,
	CONSTRAINT character_armor_pk PRIMARY KEY ("character_armor_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "armor" CASCADE;
CREATE TABLE "armor" (
	"name" TEXT NOT NULL,
	"encumbrance" integer NOT NULL,--in gp(lbs*10)
	"max_move" integer NOT NULL,
	"ac_mod" integer NOT NULL,
	CONSTRAINT armor_pk PRIMARY KEY ("name")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "class_abilities_variable" CASCADE;
CREATE TABLE "class_abilities_variable" (
	"class_name" TEXT NOT NULL,
	"level" integer NOT NULL,
	"xp_range" int4range NOT NULL,
	"cleric_spells" integer[] NOT NULL,--[1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th]
	"druid_spells" integer[] NOT NULL,
	"illusionist_spells" integer[] NOT NULL,
	"magic_user_spells" integer[] NOT NULL,
	"thief_skills" integer[] NOT NULL,--[Climb Walls, Find Traps, Hear Noise, Hide in Shadows, Move Quietly, Open Locks, Pick Pockets, Read Languages]
	"turn_undead" text[] NOT NULL,--[Skeleton, Zombie, Ghoul, Shadow, Wight, Ghast, Wraith, Mummy, Spectre, Vampire, Ghost, Lich, Fiend]
	"thac" integer[] NOT NULL,--[10, 9, ...]
	"saving_throws" integer[] NOT NULL,--[Rod Staff Wand, Breath Weapons, Death Paralysis Poison, Petrification Polymorph, Spells]
	"proficiencies" integer NOT NULL,
	"special_abilities" TEXT NOT NULL,--w/ + chars between items in the string for simple parseing
	"abilities_id" serial NOT NULL,
	"hd" integer NOT NULL,
	"hp_bonus" integer NOT NULL,
	CONSTRAINT class_abilities_variable_pk PRIMARY KEY ("abilities_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "character_class" CASCADE;
CREATE TABLE "character_class" (
	"character_id" integer NOT NULL,
	"class_name" TEXT NOT NULL,
	"hp" integer[] NOT NULL,--[...each hit dice for each level]
	"xp" integer NOT NULL,
	"og_class" BOOLEAN NOT NULL,
	"character_class_id" serial NOT NULL,
	CONSTRAINT character_class_pk PRIMARY KEY ("character_class_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "join_request_invite" CASCADE;
CREATE TABLE "join_request_invite" (
	"campaign_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"request_type" text NOT NULL,
	"message" VARCHAR(144),
	"join_request_id" serial NOT NULL,
	CONSTRAINT join_request_invite_pk PRIMARY KEY ("join_request_id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "message" ADD CONSTRAINT "message_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "message" ADD CONSTRAINT "message_fk1" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id");


ALTER TABLE "character" ADD CONSTRAINT "character_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
ALTER TABLE "character" ADD CONSTRAINT "character_fk1" FOREIGN KEY ("race") REFERENCES "race"("name");


ALTER TABLE "campaign_character" ADD CONSTRAINT "campaign_character_fk0" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id");
ALTER TABLE "campaign_character" ADD CONSTRAINT "campaign_character_fk1" FOREIGN KEY ("character_id") REFERENCES "character"("character_id");


ALTER TABLE "campaign_user" ADD CONSTRAINT "campaign_user_fk0" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id");
ALTER TABLE "campaign_user" ADD CONSTRAINT "campaign_user_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");


ALTER TABLE "character_language" ADD CONSTRAINT "character_language_fk0" FOREIGN KEY ("character_id") REFERENCES "character"("character_id");


ALTER TABLE "character_weapon" ADD CONSTRAINT "character_weapon_fk0" FOREIGN KEY ("character_id") REFERENCES "character"("character_id");
ALTER TABLE "character_weapon" ADD CONSTRAINT "character_weapon_fk1" FOREIGN KEY ("weapon_name") REFERENCES "weapon"("name");


ALTER TABLE "character_armor" ADD CONSTRAINT "character_armor_fk0" FOREIGN KEY ("character_id") REFERENCES "character"("character_id");
ALTER TABLE "character_armor" ADD CONSTRAINT "character_armor_fk1" FOREIGN KEY ("armor_name") REFERENCES "armor"("name");


ALTER TABLE "character_class" ADD CONSTRAINT "character_class_fk0" FOREIGN KEY ("character_id") REFERENCES "character"("character_id");
ALTER TABLE "character_class" ADD CONSTRAINT "character_class_fk1" FOREIGN KEY ("class_name") REFERENCES "class_abilities_fixed"("class_name");


ALTER TABLE "join_request_invite" ADD CONSTRAINT "join_request_invite_fk0" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id");
ALTER TABLE "join_request_invite" ADD CONSTRAINT "join_request_invite_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");


ALTER TABLE "character_weapon_ammo" ADD CONSTRAINT "character_weapon_ammo_fk0" FOREIGN KEY ("ammo_name") REFERENCES "ammo"("type");
ALTER TABLE "character_weapon_ammo" ADD CONSTRAINT "character_weapon_ammo_fk1" FOREIGN KEY ("character_weapon_id") REFERENCES "character_weapon"("character_weapon_id");
