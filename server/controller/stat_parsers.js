module.exports = {
    str: (str, classes, exeptionalStrength) => {
        if (classes.includes('Fighter') || classes.includes('Paladin') || classes.includes('Ranger') && str >= 18) {

                if ( 99 < exeptionalStrength || str === 19 ) return {toHit: 3, damage: 6, encumbranceAdj: 3000, minorTest: 5, minorTestEx: 1, majorTest: 40};
                else if ( 90 < exeptionalStrength ) return {toHit: 2, damage: 5, encumbranceAdj: 2000, minorTest: 4, minorTestEx: 1, majorTest: 35};
                else if ( 75 < exeptionalStrength ) return {toHit: 2, damage: 4, encumbranceAdj: 1500, minorTest: 4, minorTestEx: 0, majorTest: 30};
                else if ( 50 < exeptionalStrength ) return {toHit: 2, damage: 3, encumbranceAdj: 1250, minorTest: 4, minorTestEx: 0, majorTest: 25};
                else return {toHit: 1, damage: 3, encumbranceAdj: 1000, minorTest: 3, minorTestEx: 0, majorTest: 20};
        };
        switch(str) {
            case 3:
                return {toHit: -3, damage: -1, encumbranceAdj: -350, minorTest: 1, minorTestEx: 0, majorTest: 0};
            case 4:
                return {toHit:-2, damage:-1, encumbranceAdj: -250, minorTest:1, minorTestEx: 0, majorTest: 0};
            case 5:
                return {toHit:-2, damage:-1, encumbranceAdj: -250, minorTest:1, minorTestEx: 0, majorTest: 0};
            case 6:
                return {toHit: -1, damage: 0, encumbranceAdj: -150, minorTest: 1, minorTestEx: 0, majorTest: 0};
            case 7:
                return {toHit: -1, damage: 0, encumbranceAdj: -150, minorTest: 1, minorTestEx: 0, majorTest: 0};
            case 8:
                return {toHit: 0, damage: 0, encumbranceAdj: 0, minorTest: 2, minorTestEx: 0, majorTest: 1};
            case 9:
                return {toHit: 0, damage: 0, encumbranceAdj: 0, minorTest: 2, minorTestEx: 0, majorTest: 1};
            case 10:
                return {toHit: 0, damage: 0, encumbranceAdj: 0, minorTest: 2, minorTestEx: 0, majorTest: 2};
            case 11:
                return {toHit: 0, damage: 0, encumbranceAdj: 0, minorTest: 2, minorTestEx: 0, majorTest: 2};
            case 12:
                return {toHit: 0, damage: 0, encumbranceAdj: 100, minorTest: 2, minorTestEx: 0, majorTest: 4};
            case 13:
                return {toHit: 0, damage: 0, encumbranceAdj: 100, minorTest: 2, minorTestEx: 0, majorTest: 4};
            case 14:
                return {toHit:0, damage: 0, encumbranceAdj: 200, minorTest: 2, minorTestEx: 0, majorTest: 7};
            case 15:
                return {toHit:0, damage: 0, encumbranceAdj: 200, minorTest: 2, minorTestEx: 0, majorTest: 7};
            case 16:
                return {toHit: 0, damage: 1, encumbranceAdj: 350, minorTest: 3, minorTestEx: 0, majorTest: 10};
            case 17:
                return {toHit: 1, damage: 1, encumbranceAdj: 500, minorTest: 3, minorTestEx: 0, majorTest: 13};
            case 18:
                return {toHit: 1, damage: 2, encumbranceAdj: 750, minorTest: 3, minorTestEx: 0, majorTest: 16};
        }
    },
    int: (int) => {
        switch(int) {
            case 3:
                return {addLanguages: 0, chanceToUnderstand: 0, minSpells: 0, maxSpells: 0};
            case 4:
                return {addLanguages: 0, chanceToUnderstand: 0, minSpells: 0, maxSpells: 0};
            case 5:
                return {addLanguages: 0, chanceToUnderstand: 0, minSpells: 0, maxSpells: 0};
            case 6:
                return {addLanguages: 0, chanceToUnderstand: 0, minSpells: 0, maxSpells: 0};
            case 7:
                return {addLanguages: 0, chanceToUnderstand: 0, minSpells: 0, maxSpells: 0};
            case 8:
                return {addLanguages: 1, chanceToUnderstand: 0, minSpells: 0, maxSpells: 0};
            case 9:
                return {addLanguages: 1, chanceToUnderstand: 35, minSpells: 4, maxSpells: 6};
            case 10:
                return {addLanguages: 2, chanceToUnderstand: 45, minSpells: 5, maxSpells: 7};
            case 11:
                return {addLanguages: 2, chanceToUnderstand: 45, minSpells: 5, maxSpells: 7};        
            case 12:
                return {addLanguages: 3, chanceToUnderstand: 45, minSpells: 5, maxSpells: 7};
            case 13:
                return {addLanguages: 3, chanceToUnderstand: 55, minSpells: 6, maxSpells: 9};
            case 14:
                return {addLanguages: 4, chanceToUnderstand: 55, minSpells: 6, maxSpells: 9};
            case 15:
                return {addLanguages: 4, chanceToUnderstand: 65, minSpells: 7, maxSpells: 11};
            case 16:
                return {addLanguages: 5, chanceToUnderstand: 65, minSpells: 7, maxSpells: 11};
            case 17:
                return {addLanguages: 6, chanceToUnderstand: 75, minSpells: 8, maxSpells: 14};
            case 18:
                return {addLanguages: 7, chanceToUnderstand: 85, minSpells: 9, maxSpells: 18};
            case 19:
                return {addLanguages: 8, chanceToUnderstand: 90, minSpells: 10, maxSpells: 22, immunity: 1};
        }
    },
    wis: (wis) => {
        switch(wis) {
            case 3:
                return {mental: -3, spells: [], failure: 100};
            case 4:
                return {mental: -2, spells: [], failure: 100};
            case 5:
                return {mental: -1, spells: [], failure: 100};
            case 6:
                return {mental: -1, spells: [], failure: 100};
            case 7:
                return {mental: -1, spells: [], failure: 100};
            case 8:
                return {mental: -1, spells: [], failure: 100};
            case 9:
                return {mental: 0, spells: [], failure: 15};
            case 10:
                return {mental: 0, spells: [], failure: 10};
            case 11:
                return {mental: 0, spells: [], failure: 5};
            case 12:
                return {mental: 0, spells: [], failure: 1};
            case 13:
                return {mental: 0, spells: [1], failure: 0};
            case 14:
                return {mental: 0, spells: [2], failure: 0};
            case 15:
                return {mental: 1, spells: [2, 1], failure: 0};
            case 16:
                return {mental: 2, spells: [2, 2], failure: 0};
            case 17:
                return {mental: 3, spells: [2, 2, 1], failure: 0};
            case 18:
                return {mental: 4, spells: [2, 2, 1, 1], failure: 0};
            case 19:
                return {mental: 5, spells: [3, 2, 1, 1], failure: 0};
        }},
    dex: (dex) => {
        switch(dex) {
            case 3:
                return {suprise: -3, missile: -3, ac: 4, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 4:
                return {suprise: -2, missile: -2, ac: 3, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 5:
                return {suprise: -1, missile: -1, ac: 2, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 6:
                return {suprise: 0, missile: 0, ac: 1, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 7:
                return {suprise: 0, missile: 0, ac: 0, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 8:
                return {suprise: 0, missile: 0, ac: 0, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 9:
                return {suprise: 0, missile: 0, ac: 0, thief_adj:[0, -15, 0, -10, -20, -10, -15, 0]};
            case 10:
                return {suprise: 0, missile: 0, ac: 0, thief_adj:[0, -10, 0, -5, -15, -5, -10, 0]};
            case 11:
                return {suprise: 0, missile: 0, ac: 0, thief_adj:[0, -5, 0, 0, -10, 0, -5, 0]};
            case 12:
                return {suprise: 0, missile: 0, ac: 0, thief_adj:[0, 0, 0, 0, -5, 0, 0, 0]};
            case 13:
                return {suprise: 0, missile: 0, ac: 0, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 14:
                return {suprise: 0, missile: 0, ac: 0, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 15:
                return {suprise: 0, missile: 0, ac: -1, thief_adj:[0, 0, 0, 0, 0, 0, 0, 0]};
            case 16:
                return {suprise: 1, missile: 1, ac: -2, thief_adj:[0, 0, 0, 0, 5, 0, 0, 0]};
            case 17:
                return {suprise: 2, missile: 2, ac: -3, thief_adj:[0, 5, 0, 5, 5, 10, 0, 0]};
            case 18:
                return {suprise: 3, missile: 3, ac: -4, thief_adj:[0, 5, 0, 10, 10, 15, 5, 0]};
            case 19:
                return {suprise: 3, missile: 3, ac: -4, thief_adj:[0, 15, 0, 15, 15, 20, 15, 0]};
        }
    },
    con: (con, classes) => {
        if (classes.includes('Fighter') || classes.includes('Paladin') || classes.includes('Ranger') && con > 16) {
            switch(con) {
                case 17:
                    return {hp: 3, raise: 98, shock: 97};
                case 18:
                    return {hp: 4, raise: 100, shock: 99};
                case 19:
                    return {hp: 5, raise: 100, shock: 99};
            }
        };
        switch(con) {
            case 3:
                return {hp: -2, raise: 40, shock: 35};
            case 4:
                return {hp: -1, raise: 45, shock: 40};
            case 5:
                return {hp: -1, raise: 50, shock: 45};
            case 6:
                return {hp: -1, raise: 55, shock: 50};
            case 7:
                return {hp: 0, raise:60, shock:55};
            case 8:
                return {hp: 0, raise:65, shock:60};
            case 9:
                return {hp: 0, raise:70, shock:65};
            case 10:
                return {hp: 0, raise:75, shock:70};
            case 11:
                return {hp: 0, raise:80, shock:75};
            case 12:
                return {hp: 0, raise:85, shock:80};
            case 13:
                return {hp: 0, raise:90, shock:85};
            case 14:
                return {hp: 0, raise:92, shock:88};
            case 15:
                return {hp: 1, raise: 94, shock: 91};
            case 16:
                return {hp: 2, raise: 96, shock: 95};
            case 17:
                return {hp: 2, raise: 98, shock: 99};
            case 18:
                return {hp: 2, raise: 100, shock: 99};
            case 19:
                return {hp: 2, raise: 100, shock: 99};
        }
    },
    cha: (cha) => {
        switch(cha) {
            case 3:
                return {henchmen: 1, loyalty: -30, reaction: -25};
            case 4:
                return {henchmen: 1, loyalty: -25, reaction: -20};
            case 5:
                return {henchmen: 2, loyalty: -20, reaction: -15};
            case 6:
                return {henchmen: 2, loyalty: -15, reaction: -10};
            case 7:
                return {henchmen: 3, loyalty: -10, reaction: -5};
            case 8:
                return {henchmen: 3, loyalty: -5, reaction: 0};
            case 9:
                return {henchmen: 4, loyalty: 0, reaction: 0};
            case 10:
                return {henchmen: 4, loyalty: 0, reaction: 0};
            case 11:
                return {henchmen: 4, loyalty: 0, reaction: 0};
            case 12:
                return {henchmen: 5, loyalty: 0, reaction: 0};
            case 13:
                return {henchmen: 5, loyalty: 0, reaction: 5};
            case 14:
                return {henchmen: 6, loyalty: 5, reaction: 10};
            case 15:
                return {henchmen: 7, loyalty: 15, reaction: 15};
            case 16:
                return {henchmen: 8, loyalty: 20, reaction: 25};
            case 17:
                return {henchmen: 10, loyalty: 30, reaction: 30};
            case 18:
                return {henchmen: 15, loyalty: 40, reaction: 35};
            case 19:
                return {henchmen: 20, loyalty: 50, reaction: 40};
        }
    },
    dualClassParser: (character) => {
        let ogClass;
        let newClass;
        character.classDetails.forEach(cLass => {
            if (!cLass.og_class) {
                newClass = cLass;
            } else {
                ogClass = cLass;
            }
        });
        character.savingThrows = ogClass.saving_throws.map((num, i) => {
            return Math.min(num, newClass.saving_throws[i]) - character.saving_throw_adj;
        });
        for (let i = 0; i < ogClass.hp.length; i++) {
            newClass.hp.unshift();
        }
        ogHP = ogClass.hp.reduce((acc, num) => {
            return acc + num + character.con.hp;
        }, 0) + ogClass.hp_bonus;
        newHP = newClass.hp.reduce((acc, num) => {
            if (num) return acc + num + character.con.hp;
            else return acc;
        }, 0) + newClass.hp_bonus;
        character.hp = ogHP + newHP; 
        character = { ...character, }
        character.classDetails[0] = ogClass;
        character.classDetails[1] = newClass;
        return character;
    },
    multiClassParser: (character) => {
        let count = 0;
        let hp = 0;
        let savingThrows = [20, 20, 20, 20, 20];
        character.classDetails.forEach(cLass => {
            hp += cLass.hp.reduce((acc, num) => {
                return acc + num;
            }, 0);
            savingThrows = savingThrows.map((num , i) => {
                return Math.min(num, cLass.saving_throws[i] - character.saving_throw_adj);
            });
            count++;
        })
        return { ...character, hp: Math.floor(hp/count), savingThrows };
    },
    classParser: (character) => {
        character.hp = character.classDetails[0].hp.reduce((acc, num) => {
            return acc + num + character.con.hp;
        }) + character.classDetails[0].hp_bonus;
        character.savingThrows = character.classDetails[0].saving_throws.map(savingThrow => {
            return savingThrow - character.saving_throw_adj
        })
        return character;
    },
    racialStatParser: (character) => {
        character.stats = character.stats.map((element, i)=> {
            return element + character.stat_adj[i];
        });
        return character;
    },
    racialSavingThrows: (character, con) => {
        character.special_abilities += `&+${Math.floor(con / 3.5)} to saves against poison and magic`;
        return character 
    },
    checkLevelLimit: (character, cLass) => {
        const { race } = character;
        const { class_name } = cLass;
        const [ str, int, wis, dex, con, cha ] = character.stats
        switch (race) {
            case "Dwarf":
                switch (class_name) {
                    case "Assassin":
                        return 9;
                    case "Cleric":
                        return 8;
                    case "Fighter":
                        switch (str) {
                            case 17:
                                return 8;
                            case 18:
                                return 9;
                            default:
                                return 7;
                        };
                    case "Thief":
                        return 24;
                };
                break;
            case "Elf":
                switch (class_name) {
                    case "Assassin":
                        return 10;
                    case "Cleric":
                        return 7;
                    case "Fighter":
                        switch (str) {
                            case 17:
                                return 6;
                            case 18:
                                return 7;
                            default:
                                return 5;
                        };
                    case "Magic-User":
                        switch (int) {
                            case 17:
                                return 10;
                            case 18: 
                                return 11;
                            default:
                                return 9;
                        }
                        break;
                    case "Thief":
                        return 24;
                };
                break;
            case "Gnome":
                switch (class_name) {
                    case "Assassin":
                        return 8;
                    case "Cleric":
                        return 7;
                    case "Fighter":
                        switch (str) {
                            case 18:
                                return 6;
                            default:
                                return 5;
                        };
                    case "Illusionist":
                        if (int < 17 || dex < 17) return 5; 
                        else if (int > 17 || dex > 17) return 7;
                        else return 6;
                    case "Thief":
                        return 24;
                };
                break;
            case "Half-Elf":
                switch (class_name) {
                    case "Assassin":
                        return 11;
                    case "Cleric":
                        return 5;
                    case "Fighter":
                        switch (str) {
                            case 17:
                                return 7;
                            case 18:
                                return 8;
                            default:
                                return 6;
                        }
                    case "Magic-User":
                        switch (int) {
                            case 17:
                                return 7;
                            case 18:
                                return 8;
                            default:
                                return 6;
                        };
                    case "Ranger":
                        switch (str) {
                            case 17:
                                return 7;
                            case 18:
                                return 8;
                            default:
                                return 6;
                        }
                    case "Thief":
                        return 24;
                };
                break;
            case "Halfling":
                switch (class_name) {
                    case "Druid":
                        return 6;
                    case "Fighter":
                        return 4;
                    case "Thief":
                        return 24;
                };
                break;
            case "Half-Orc":
                switch (class_name) {
                    case "Assassin":
                        return 15;
                    case "Cleric":
                        return 4;
                    case "Fighter":
                        return 10;
                    case "Thief":
                        switch (dex) {
                            case 17: 
                                return 7;
                            default:
                                return 6;
                        };
                };
                break;
            case "Human":
                return 24
        }
    }
}