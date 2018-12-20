
DROP TABLE IF EXISTS "users" CASCADE;
CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"username" varchar(50) NOT NULL UNIQUE,
	"hash_value" TEXT NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "message" CASCADE;
CREATE TABLE "message" (
	"message_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"campaign_id" integer NOT NULL,
	"text" varchar(144) NOT NULL,
	"is_image" BOOLEAN NOT NULL,
	"likes" integer NOT NULL,
	"dislikes" integer NOT NULL,
	CONSTRAINT message_pk PRIMARY KEY ("message_id")
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
	"temp_level" integer NOT NULL,
	"temp_hp" integer NOT NULL,
	"alignment" varchar(20) NOT NULL,
	"stats" integer[] NOT NULL,
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
	"special_abilities" TEXT NOT NULL,
	"img" TEXT NOT NULL,
	CONSTRAINT character_pk PRIMARY KEY ("character_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "campaign" CASCADE;
CREATE TABLE "campaign" (
	"campaign_id" serial NOT NULL,
	"name" varchar(144) NOT NULL,
	"img" TEXT NOT NULL,
	"class_restrictions" BOOLEAN NOT NULL,
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
	"name" TEXT NOT NULL,
	"min_stats" integer[] NOT NULL,
	"bonus_xp_stats" integer[] NOT NULL,
	"weapons" text[] NOT NULL,
	"armor" text[] NOT NULL,
	"non_proficiency_penalty" integer NOT NULL,
	"hd" integer NOT NULL,
	CONSTRAINT class_abilities_fixed_pk PRIMARY KEY ("name")
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
	"classes" integer[] NOT NULL,
	CONSTRAINT race_pk PRIMARY KEY ("name")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "language" CASCADE;
CREATE TABLE "language" (
	"name" TEXT NOT NULL,
	CONSTRAINT language_pk PRIMARY KEY ("name")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "character_language" CASCADE;
CREATE TABLE "character_language" (
	"character_id" integer NOT NULL,
	"language_name" TEXT NOT NULL,
	"character_language_id" serial NOT NULL,
	CONSTRAINT character_language_pk PRIMARY KEY ("character_language_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "race_language" CASCADE;
CREATE TABLE "race_language" (
	"language_name" TEXT NOT NULL,
	"race_name" TEXT NOT NULL,
	"race_langauge_id" serial NOT NULL,
	CONSTRAINT race_language_pk PRIMARY KEY ("race_langauge_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "weapon" CASCADE;
CREATE TABLE "weapon" (
	"name" TEXT NOT NULL,
	"damage_small_medium" TEXT NOT NULL,
	"damage_large" TEXT NOT NULL,
	"range" TEXT NOT NULL,
	"fire_rate" TEXT NOT NULL,
	CONSTRAINT weapon_pk PRIMARY KEY ("name")
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
	CONSTRAINT character_weapon_pk PRIMARY KEY ("character_weapon_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "character_armor" CASCADE;
CREATE TABLE "character_armor" (
	"character_id" integer NOT NULL,
	"armor_name" TEXT NOT NULL,
	"has_shield" BOOLEAN NOT NULL,
	"character_armor" serial NOT NULL,
	"ac_adj" integer NOT NULL,
	CONSTRAINT character_armor_pk PRIMARY KEY ("character_armor")
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
	"spells" integer[] NOT NULL,--[1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th]
	"thief_skills" integer[] NOT NULL,--[Climb Walls, Find Traps, Hear Noise, Hide in Shadows, Move Quietly, Open Locks, Pick Pockets, Read Languages]
	"turn_undead" integer[] NOT NULL,--[Skeleton, Zombie, Ghoul, Shadow, Wight, Ghast, Wraith, Mummy, Spectre, Vampire, Ghost, Lich, Fiend]
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
	"character_class_id" serial NOT NULL,
	CONSTRAINT character_class_pk PRIMARY KEY ("character_class_id")
) WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "join_request_invite" CASCADE;
CREATE TABLE "join_request_invite" (
	"campaign_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"type" text NOT NULL,
	"text" VARCHAR(144),
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
ALTER TABLE "character_language" ADD CONSTRAINT "character_language_fk1" FOREIGN KEY ("language_name") REFERENCES "language"("name");


ALTER TABLE "race_language" ADD CONSTRAINT "race_language_fk0" FOREIGN KEY ("language_name") REFERENCES "language"("name");
ALTER TABLE "race_language" ADD CONSTRAINT "race_language_fk1" FOREIGN KEY ("race_name") REFERENCES "race"("name");


ALTER TABLE "character_weapon" ADD CONSTRAINT "character_weapon_fk0" FOREIGN KEY ("character_id") REFERENCES "character"("character_id");
ALTER TABLE "character_weapon" ADD CONSTRAINT "character_weapon_fk1" FOREIGN KEY ("weapon_name") REFERENCES "weapon"("name");


ALTER TABLE "character_armor" ADD CONSTRAINT "character_armor_fk0" FOREIGN KEY ("character_id") REFERENCES "character"("character_id");


ALTER TABLE "character_class" ADD CONSTRAINT "character_class_fk0" FOREIGN KEY ("character_id") REFERENCES "character"("character_id");
ALTER TABLE "character_class" ADD CONSTRAINT "character_class_fk1" FOREIGN KEY ("class_name") REFERENCES "class_abilities_fixed"("name");


ALTER TABLE "join_request_invite" ADD CONSTRAINT "join_request_invite_fk0" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id");
ALTER TABLE "join_request_invite" ADD CONSTRAINT "join_request_invite_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
