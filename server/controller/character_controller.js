let statParser = require("./stat_parsers.js");
let _ = require("lodash");

module.exports = {
  import_character: async (req, res) => {
    let { name, campaign_id } = req.body;
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const character = await db.character.findOne({ name });
    if (character) {
      if (character.user_id === user_id) {
        let isParticipating = await db.campaign_character.findOne({
          campaign_id,
          character_id: character.character_id
        });
        if (!isParticipating) {
          await db.create_campaign_character([
            campaign_id,
            character.character_id
          ]);
          res.sendStatus(201);
        } else {
          res.status(409).send("That character is already in the campaign");
        }
      } else {
        res.status(401).send("That is not your character");
      }
    } else {
      res
        .status(404)
        .send("Sorry we could not find a character with that name");
    }
  },
  creation_data: async (req, res) => {
    const db = req.app.get("db");
    const classes = await db.get_class_data();
    const races = await db.get_race_data();
    const weapons = await db.get_weapon_data();
    const ammo = await db.get_ammo_data();
    const armor = await db.get_armor_data();
    res.status(200).send({ classes, races, weapons, ammo, armor });
  },
  create: async (req, res) => {
    let {
      name,
      cLass,
      alignment,
      cha,
      con,
      dex,
      int,
      str,
      wis,
      exeptionalStrength,
      proficiencies,
      race,
      startingGold,
      campaign_id
    } = req.body;
    const { user_id } = req.session.user;
    const db = req.app.get("db");
    startingGold = [0, 0, 0, startingGold, 0];
    let baseStats = [str, int, wis, dex, con, cha, exeptionalStrength || 0];
    let [statAdj] = await db.get_stat_adj([race]);
    statAdj = statAdj.stat_adj;
    let str19 = false;
    console.log(baseStats);
    const stats = baseStats.map((element, i, stats) => {
      if (element > 18 || element < 4) {
        return element;
      } else if (i === 6 && statAdj[0] > 0 && stats[0] >= 18) {
        if (element < 51) {
          return 51;
        } else if (element < 76) {
          return 76;
        } else if (element < 91) {
          return 91;
        } else if (element < 100) {
          str19 = true;
          return 0;
        }
      } else {
        return element + statAdj[i];
      }
    });
    if (str19) {
      stats[0] = 19;
    }
    console.log(stats);
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    let character_id = 0;
    character_id = await db.create_new_character([
      user_id,
      name,
      race,
      alignment,
      stats,
      proficiencies,
      startingGold
    ]);
    await db.put_no_armor([character_id[0].character_id]);
    const classArr = cLass.split("/");
    for (cLass of classArr) {
      let hp = [];
      for (entry in req.body) {
        if (
          entry === `${cLass}hp` ||
          entry === `${cLass}hp1` ||
          entry === `${cLass}hp2`
        ) {
          hp.push(req.body[entry]);
        }
      }
      await db.create_character_class([
        character_id[0].character_id,
        cLass,
        hp
      ]);
    }
    db.create_campaign_character([campaign_id, character_id[0].character_id]);
    res.sendStatus(201);
  },
  update: async (req, res) => {
    let {
      abilities,
      combat,
      Inventory,
      personalDetails,
      character,
      dualClass,
      XP
    } = req.body;
    const db = req.app.get("db");
    const { stats, character_id, classDetails, race } = character;
    const abilitiesUpdate = [];
    const personalUpdate = [];
    for (let catagory in req.body) {
      switch (catagory) {
        case "abilities":
          let editStats = [];
          for (let key in abilities) {
            if (abilities[key]) {
              switch (key) {
                case "str":
                  editStats[0] = abilities[key];
                  break;
                case "int":
                  editStats[1] = abilities[key];
                  break;
                case "wis":
                  editStats[2] = abilities[key];
                  break;
                case "dex":
                  editStats[3] = abilities[key];
                  break;
                case "con":
                  editStats[4] = abilities[key];
                  break;
                case "cha":
                  editStats[5] = abilities[key];
                  break;
                case "exeptionalStrength":
                  editStats[6] = abilities[key];
                  break;
                default:
                  abilitiesUpdate[key] = abilities[key];
              }
            }
          }
          newStats = stats.map((stat, i) => {
            if (editStats[i]) return editStats[i];
            else return stat;
          });
          abilitiesUpdate.stats = newStats;
          await db.character.update(
            { character_id: [character_id] },
            { ...abilitiesUpdate }
          );
          break;
        case "personalDetails":
          for (let key in personalDetails) {
            switch (key) {
              case "name":
              case "title":
                personalDetails[key] =
                  personalDetails[key].charAt(0).toUpperCase() +
                  personalDetails[key].slice(1).toLowerCase();
                break;
            }
          }
          await db.character.update(
            { character_id: [character_id] },
            { ...personalDetails }
          );
          break;
        case "dualClass":
          if (dualClass.class_name) {
            await db.create_dual_class([character_id, dualClass.class_name]);
          }
          break;
        case "combat":
          for (let key in combat) {
            switch (key) {
              case "weapons":
                combat.weapons.forEach(weapon => {
                  db.character_weapon.save(weapon);
                });
                break;
              case "ammo":
                combat.ammo.forEach(ammo => {
                  db.character_weapon_ammo.save(ammo);
                });
                break;
              case "armor":
                combat.armor.forEach(armor => {
                  armor = { ...armor, armor_name: armor.name };
                  db.character_armor.save(armor);
                });
                break;
              case "shield":
                combat.shield.forEach(shield => {
                  shield = { ...shield, armor_name: shield.name };
                  db.character_armor.save(shield);
                });
                break;
              case "newAmmo":
                ammoArr = [];
                combat.newAmmo.forEach((ammo, i) => {
                  ammoArr[i] = {
                    ammo_name: ammo.type,
                    character_weapon_id: ammo.character_weapon_id,
                    attack_adj: 0,
                    damage_adj: 0,
                    quantity: 0
                  };
                });
                db.character_weapon_ammo.insert(ammoArr);
                break;
              case "newWeapon":
                weaponArr = [];
                combat.newWeapon.forEach((weapon, i) => {
                  const { weapon_name, character_id } = weapon;
                  weaponArr[i] = {
                    weapon_name,
                    character_id,
                    attack_adj: 0,
                    damage_adj: 0
                  };
                });
                db.character_weapon.insert(weaponArr);
                break;
              case "newArmor":
                if (combat.newArmor.name) {
                  const { character_id, name } = combat.newArmor;
                  db.create_new_armor([character_id, name]);
                }
                break;
              case "newShield":
                if (combat.newShield.name) {
                  const { character_id, name } = combat.newShield;
                  db.create_new_shield([character_id, name]);
                }
                break;
              case "deleteAmmo":
                combat.deleteAmmo.forEach(id => {
                  db.character_weapon_ammo.destroy({
                    character_weapon_ammo_id: id
                  });
                });
                break;
              case "deleteWeapon":
                combat.deleteWeapon.forEach(id => {
                  db.character_weapon_ammo.destroy({ character_weapon_id: id });
                  db.character_weapon.destroy({ character_weapon_id: id });
                });
                break;
            }
          }
          break;
        case "XP":
          for (let key in XP) {
            switch (key) {
              case "xp":
                const { xp, idArr } = XP.xp;
                if (idArr) {
                  if (classDetails.length > 1 && race === "Human") {
                    let ogXp = 0;
                    classDetails.forEach(cLass => {
                      if (cLass.og_class) {
                        ogXp = cLass.xp;
                      }
                    });
                    db.character_class.update(
                      { character_class_id: idArr },
                      { xp: xp - ogXp }
                    );
                  } else {
                    db.character_class.update(
                      { character_class_id: idArr },
                      { xp: xp / idArr.length }
                    );
                  }
                }
                break;
              case "hp":
                const { hp } = XP;
                classDetails.forEach(cLass => {
                  hp.forEach(hd => {
                    if (
                      (hd || {}).character_class_id === cLass.character_class_id
                    ) {
                      cLass.hp.push(hd.hp);
                    }
                  });
                  let count = 0;
                  if (!cLass.og_class) {
                    cLass.hp.forEach((hd, i) => {
                      if (hd === 0) {
                        count++;
                      }
                    });
                  }
                  cLass.hp.splice(0, count);
                  db.character_class.save({
                    character_class_id: cLass.character_class_id,
                    hp: cLass.hp
                  });
                });
                break;
            }
          }
          break;
        case "Inventory":
          for (let key in Inventory) {
            switch (key) {
              case "createItem":
                if (Inventory.createItem.length > 0) {
                  db.item.insert(Inventory.createItem);
                }
                break;
              case "deleteItem":
                Inventory.deleteItem.forEach(item => {
                  db.item.destroy({ item_id: item.item_id });
                });
                break;
            }
          }
          break;
      }
    }
    res.sendStatus(202);
  },
  delete: async (req, res) => {
    const { campaign_id, character_id } = req.query;
    const db = req.app.get("db");
    await db.remove_character([campaign_id, character_id]);
    res.sendStatus(200);
  }
};
