import React, { Component } from "react";
import { connect } from "react-redux";
import { inputCharacterEdits } from "../../ducks/reducer/character_reducer";
import WeaponsContainer from "./WeaponsContainer.jsx";
import "./Combat.css";

class Combat extends Component {
  constructor(props) {
    super(props);

    this.armorSelect = React.createRef();
    this.shieldSelect = React.createRef();

    this.state = {
      revealed: false,
      currentHP: this.props.character.hp
    };
  }

  toggle = event => {
    const { name } = event.target;
    this.setState({ [name]: !this.state[name] });
  };

  increment = event => {
    let { name, value } = event.target;
    let item = this.state[name];
    if (value === "+") {
      item += 1;
    } else {
      item -= 1;
    }
    this.setState({ [name]: item });
  };

  handleInputIncrement = (event, place) => {
    const { name, value } = event.target;
    let adj =
      this.props.characterChanges[place][name] === 0
        ? 0
        : this.props.characterChanges[place][name] ||
          this.props.character[name];
    if (value.includes("+")) adj += 1;
    else adj -= 1;
    this.props.inputCharacterEdits(place, name, adj);
  };

  handleInputAdj = (event, object, place) => {
    const { name, value } = event.target;
    let adjObj;
    let index;
    this.props.characterChanges.combat[place].forEach((obj, i) => {
      if (place === "weapons") {
        if (object.character_weapon_id === obj.character_weapon_id) {
          adjObj = obj;
          index = i;
        }
      } else if (place === "ammo") {
        if (object.character_weapon_ammo_id === obj.character_weapon_ammo_id) {
          adjObj = obj;
          index = i;
        }
      } else if (place === "armor" || place === "shield") {
        if (object.character_armor_id === obj.character_armor_id) {
          adjObj = obj;
        }
      }
    });
    let adj = { ...(adjObj || object) };
    if (value.includes("+")) {
      if (value.includes("*5")) {
        adj[name] += 4;
      }
      adj[name] += 1;
    } else {
      if (name === "quantity" && adj[name] - 1 <= 0) {
        adj[name] = 0;
      } else {
        if (value.includes("*5")) {
          adj[name] -= 4;
        }
        adj[name] -= 1;
      }
    }
    let arr = this.props.characterChanges.combat[place] || [];
    if (place === "weapons") {
      if (arr[index]) {
        arr[index] = { ...adj };
      } else {
        arr.push({ ...adj });
      }
    } else if (place === "ammo") {
      if (arr[index]) {
        arr[index] = { ...adj };
      } else {
        arr.push({ ...adj });
      }
    } else {
      arr[0] = { ...adj };
    }
    this.props.inputCharacterEdits("combat", place, arr);
  };

  handleInputNew = (event, id) => {
    const { name, value } = event.target;
    let arr = this.props.characterChanges.combat[name] || [];
    if (name === "newAmmo") {
      arr.push({ type: value, character_weapon_id: id });
    } else if (name === "newWeapon") {
      arr.push({ weapon_name: value, character_id: id });
    } else if (name === "newArmor" || name === "newShield") {
      arr = { name: value, character_id: id };
    }
    this.props.inputCharacterEdits("combat", name, arr);
  };

  handleInputDelete = (event, id) => {
    const { name } = event.target;
    let arr = this.props.characterChanges.combat[name];
    arr = [...arr, id];
    this.props.inputCharacterEdits("combat", name, arr);
  };

  render() {
    const { is_dm } = this.props.currentCampaign.campaignDetails;

    const {
      str,
      dex,
      weaponDetails,
      race,
      ac_bonus,
      classDetails,
      proficiencies,
      character_id,
      armorDetails,
      savingThrows,
      saving_throw_adj,
      special_attack,
      resistances
    } = this.props.character;

    let nonProficiencyPenalty = classDetails.reduce((acc, cLass) => {
      if (acc >= cLass.non_proficiency_penalty) {
        return cLass.non_proficiency_penalty;
      } else {
        return acc;
      }
    }, 10);
    const weapons = weaponDetails.map(weapon => {
      const { name, damage_large, damage_small_medium, ammoDetails } = weapon;
      let weaponUpdate;
      this.props.characterChanges.combat.weapons.forEach(obj => {
        if (obj.character_weapon_id === weapon.character_weapon_id) {
          weaponUpdate = obj;
        }
      });

      let weaponMagicAttackAdj = is_dm
        ? (weaponUpdate || {}).attack_adj === 0
          ? 0
          : (weaponUpdate || weapon).attack_adj || weapon.attack_adj
        : 0;
      let proficiencyAdj = !proficiencies.includes(weapon.name)
        ? -nonProficiencyPenalty
        : 0;
      let toHit = str.toHit + proficiencyAdj + weaponMagicAttackAdj;
      if (
        race === "Elf" &&
        (weapon.name === "Long-Sword" ||
          weapon.name === "Short-Sword" ||
          weapon.name === "Long-Bow" ||
          weapon.name === "Short-Bow" ||
          weapon.name === "Composite-Long-Bow" ||
          weapon.name === "Composite-Short-Bow")
      ) {
        toHit += 1;
      }
      let weaponMagicDamageAdj = is_dm
        ? (weaponUpdate || {}).damage_adj === 0
          ? 0
          : (weaponUpdate || weapon).damage_adj || weapon.damage_adj
        : 0;
      let damage = str.damage + weaponMagicDamageAdj;
      let ammoOptions = weapon.ammo_types.map(ammo => {
        let ammoTypeData = {};
        this.props.characterData.ammo.forEach(ammoType => {
          if (ammoType.type === ammo) {
            ammoTypeData = ammoType;
          }
        });
        return <option value={ammo}>Add: {ammoTypeData.name}</option>;
      });
      let ammo = ammoDetails.map(ammo => {
        const {
          name,
          damage_large,
          damage_small_medium,
          rate_of_fire,
          range
        } = ammo;
        let ammoUpdate;
        this.props.characterChanges.combat.ammo.forEach(obj => {
          if (obj.character_weapon_ammo_id === ammo.character_weapon_ammo_id) {
            ammoUpdate = obj;
          }
        });
        let ammoMagicAttackAdj = is_dm
          ? (ammoUpdate || {}).attack_adj === 0
            ? 0
            : (ammoUpdate || ammo).attack_adj || ammo.attack_adj
          : 0;
        let toHit =
          dex.missile +
          proficiencyAdj +
          ammoMagicAttackAdj +
          weaponMagicAttackAdj;
        if (
          race === "Elf" &&
          (weapon.name === "Short-Bow" ||
            weapon.name === "Long-Bow" ||
            weapon.name === "Composite-Short-Bow" ||
            weapon.name === "Composite-Long-Bow")
        ) {
          toHit += 1;
        }
        if (
          race === "Halfling" &&
          (weapon.name === "Short-Bow" ||
            weapon.name === "Long-Bow" ||
            weapon.name === "Composite-Short-Bow" ||
            weapon.name === "Composite-Long-Bow" ||
            weapon.name === "Sling")
        ) {
          toHit += 3;
        }
        let ammoMagicDamageAdj = is_dm
          ? (ammoUpdate || {}).damage_adj === 0
            ? 0
            : (ammoUpdate || ammo).damage_adj || ammo.damage_adj
          : 0;
        let ammoStrAdj =
          name === "Hand-Axe" ||
          name === "Club" ||
          name === "Dagger" ||
          name === "Dart" ||
          name === "Hammer" ||
          name === "Javelin" ||
          name === "Spear"
            ? str.damage
            : 0;
        let damage = weaponMagicDamageAdj + ammoMagicDamageAdj + ammoStrAdj;
        let newQuantity = (ammoUpdate || ammo).quantity;
        let quantityDisplay = [];
        for (
          ;
          newQuantity >= 100 && quantityDisplay.length < 20;
          newQuantity -= 100
        ) {
          quantityDisplay.push(<div className="quantityMarker qm100" />);
        }
        for (
          ;
          newQuantity >= 20 && quantityDisplay.length < 20;
          newQuantity -= 20
        ) {
          quantityDisplay.push(<div className="quantityMarker qm20" />);
        }
        for (
          ;
          newQuantity >= 5 && quantityDisplay.length < 20;
          newQuantity -= 5
        ) {
          quantityDisplay.push(<div className="quantityMarker qm5" />);
        }
        for (
          ;
          newQuantity > 0 && quantityDisplay.length < 20;
          newQuantity -= 1
        ) {
          quantityDisplay.push(<div className="quantityMarker" />);
        }
        return (
          <div
            className="Smalltext"
            style={{
              display: this.props.characterChanges.combat.deleteAmmo.includes(
                (ammoUpdate || ammo).character_weapon_ammo_id
              )
                ? "none"
                : "",
              marginLeft: 5,
              marginTop: -2
            }}
          >
            <h1>
              {name}{" "}
              <button
                name="deleteAmmo"
                className="button"
                id="IncrementButtonX"
                onClick={event =>
                  this.handleInputDelete(event, ammo.character_weapon_ammo_id)
                }
                style={{ display: this.props.edit && is_dm ? "" : "none" }}
              >
                x
              </button>
              <div className="Container">
                (
                <button
                  style={{ display: this.props.edit && is_dm ? "" : "none" }}
                  onClick={event => this.handleInputAdj(event, ammo, "ammo")}
                  className="button"
                  id="IncrementButton"
                  name="attack_adj"
                  value="-"
                >
                  -
                </button>
                <p style={{ marginRight: 3, marginLeft: 3 }}>
                  To Hit: {toHit > 0 ? "+" : ""}
                  {toHit}
                </p>
                <div
                  className="Container MinuteText"
                  style={{ display: this.props.advanced ? "" : "none" }}
                >
                  <h1 style={{ marginRight: 2 }}>Dexterity:</h1>
                  <p style={{ marginRight: 2 }}>
                    {dex.missile > 0 ? "+" : ""}
                    {dex.missile}
                  </p>
                  <h1
                    style={{
                      display: !proficiencies.includes(weapon.name)
                        ? ""
                        : "none",
                      marginRight: 2
                    }}
                  >
                    Non-Proficiency:
                  </h1>
                  <p
                    style={{
                      display: !proficiencies.includes(weapon.name)
                        ? ""
                        : "none",
                      marginRight: 2
                    }}
                  >
                    -{nonProficiencyPenalty}
                  </p>
                  <h1
                    style={{
                      display: is_dm && ammoMagicAttackAdj ? "" : "none",
                      marginRight: 2
                    }}
                  >
                    Magic Adj(Ammo):
                  </h1>
                  <p
                    style={{
                      display: is_dm && ammoMagicAttackAdj ? "" : "none",
                      marginRight: 2
                    }}
                  >
                    {ammoMagicAttackAdj > 0 ? "+" : ""}
                    {ammoMagicAttackAdj}
                  </p>
                  <h1
                    style={{
                      display: is_dm && weaponMagicAttackAdj ? "" : "none",
                      marginRight: 2
                    }}
                  >
                    Magic Adj(Weapon):
                  </h1>
                  <p
                    style={{
                      display: is_dm && weaponMagicAttackAdj ? "" : "none",
                      marginRight: 2
                    }}
                  >
                    {weaponMagicAttackAdj > 0 ? "+" : ""}
                    {weaponMagicAttackAdj}
                  </p>
                  <h1
                    style={{
                      display:
                        race === "Elf" &&
                        (weapon.name === "Short-Bow" ||
                          weapon.name === "Long-Bow" ||
                          weapon.name === "Composite-Short-Bow" ||
                          weapon.name === "Composite-Long-Bow")
                          ? ""
                          : "none",
                      marginRight: 2
                    }}
                  >
                    Racial Adj(Elf):
                  </h1>
                  <p
                    style={{
                      display:
                        race === "Elf" &&
                        (weapon.name === "Short-Bow" ||
                          weapon.name === "Long-Bow" ||
                          weapon.name === "Composite-Short-Bow" ||
                          weapon.name === "Composite-Long-Bow")
                          ? ""
                          : "none",
                      marginRight: 2
                    }}
                  >
                    +1
                  </p>
                  <h1
                    style={{
                      display:
                        race === "Halfling" &&
                        (weapon.name === "Short-Bow" ||
                          weapon.name === "Long-Bow" ||
                          weapon.name === "Composite-Short-Bow" ||
                          weapon.name === "Composite-Long-Bow" ||
                          weapon.name === "Sling")
                          ? ""
                          : "none",
                      marginRight: 2
                    }}
                  >
                    Racial Adj(Halfling):
                  </h1>
                  <p
                    style={{
                      display:
                        race === "Halfling" &&
                        (weapon.name === "Short-Bow" ||
                          weapon.name === "Long-Bow" ||
                          weapon.name === "Composite-Short-Bow" ||
                          weapon.name === "Composite-Long-Bow" ||
                          weapon.name === "Sling")
                          ? ""
                          : "none",
                      marginRight: 2
                    }}
                  >
                    +3
                  </p>
                </div>{" "}
                <button
                  style={{ display: this.props.edit && is_dm ? "" : "none" }}
                  onClick={event => this.handleInputAdj(event, ammo, "ammo")}
                  className="button"
                  id="IncrementButton"
                  name="attack_adj"
                  value="+"
                >
                  +
                </button>
                <button
                  style={{ display: this.props.edit && is_dm ? "" : "none" }}
                  onClick={event => this.handleInputAdj(event, ammo, "ammo")}
                  className="button"
                  id="IncrementButton"
                  name="damage_adj"
                  value="-"
                >
                  -
                </button>
                <p style={{ marginRight: 3 }}>
                  Damage: {damage > 0 ? "+" : ""}
                  {damage}
                </p>
                <div
                  className="Container MinuteText"
                  style={{ display: this.props.advanced ? "" : "none" }}
                >
                  <h1
                    style={{
                      display:
                        name === "Hand-Axe" ||
                        name === "Club" ||
                        name === "Dagger" ||
                        name === "Dart" ||
                        name === "Hammer" ||
                        name === "Javelin" ||
                        name === "Spear"
                          ? ""
                          : "none",
                      marginRight: 2
                    }}
                  >
                    Strength:
                  </h1>
                  <p
                    style={{
                      display:
                        name === "Hand-Axe" ||
                        name === "Club" ||
                        name === "Dagger" ||
                        name === "Dart" ||
                        name === "Hammer" ||
                        name === "Javelin" ||
                        name === "Spear"
                          ? ""
                          : "none",
                      marginRight: 2
                    }}
                  >
                    {ammoStrAdj > 0 ? "+" : ""}
                    {ammoStrAdj}
                  </p>
                  <h1
                    style={{
                      display: is_dm && ammoMagicDamageAdj ? "" : "none",
                      marginRight: 2
                    }}
                  >
                    Magic Adj(Ammo):
                  </h1>
                  <p
                    style={{
                      display: is_dm && ammoMagicDamageAdj ? "" : "none",
                      marginRight: 2
                    }}
                  >
                    {ammoMagicDamageAdj > 0 ? "+" : ""}
                    {ammoMagicDamageAdj}
                  </p>
                  <h1
                    style={{
                      display: is_dm && weaponMagicDamageAdj ? "" : "none",
                      marginRight: 2
                    }}
                  >
                    Magic Adj(Weapon):
                  </h1>
                  <p
                    style={{
                      display: is_dm && weaponMagicDamageAdj ? "" : "none",
                      marginRight: 2
                    }}
                  >
                    {weaponMagicDamageAdj > 0 ? "+" : ""}
                    {weaponMagicDamageAdj}
                  </p>
                </div>
                <button
                  style={{ display: this.props.edit && is_dm ? "" : "none" }}
                  onClick={event => this.handleInputAdj(event, ammo, "ammo")}
                  className="button"
                  id="IncrementButton"
                  name="damage_adj"
                  value="+"
                >
                  +
                </button>
                )
              </div>
            </h1>
            <p>
              Damage S/M: {damage_small_medium} Damage L: {damage_large} Range:{" "}
              {range}' Fire-Rate: {rate_of_fire}
            </p>
            <div className="Container">
              Quantity:
              <button
                style={{
                  display: this.props.edit && is_dm ? "" : "none",
                  height: 13,
                  width: 13
                }}
                onClick={event => this.handleInputAdj(event, ammo, "ammo")}
                className="button"
                id="IncrementButton"
                name="quantity"
                value="-*5"
              >
                -5
              </button>
              <button
                style={{ display: this.props.edit && is_dm ? "" : "none" }}
                onClick={event => this.handleInputAdj(event, ammo, "ammo")}
                className="button"
                id="IncrementButton"
                name="quantity"
                value="-"
              >
                -
              </button>
              <span className="quantityBox">{quantityDisplay}</span>
              <button
                style={{ display: this.props.edit && is_dm ? "" : "none" }}
                onClick={event => this.handleInputAdj(event, ammo, "ammo")}
                className="button"
                id="IncrementButton"
                name="quantity"
                value="+"
              >
                +
              </button>
              <button
                style={{
                  display: this.props.edit && is_dm ? "" : "none",
                  height: 13,
                  width: 13
                }}
                onClick={event => this.handleInputAdj(event, ammo, "ammo")}
                className="button"
                id="IncrementButton"
                name="quantity"
                value="+*5"
              >
                +5
              </button>
            </div>
          </div>
        );
      });
      return (
        <div
          className="WeaponBox"
          style={{
            display: this.props.characterChanges.combat.deleteWeapon.includes(
              (weaponUpdate || weapon).character_weapon_id
            )
              ? "none"
              : ""
          }}
        >
          <h1 className="Text text">
            {name}{" "}
            <button
              className="button"
              id="IncrementButtonX"
              name="deleteWeapon"
              onClick={event =>
                this.handleInputDelete(event, weapon.character_weapon_id)
              }
              style={{ display: this.props.edit && is_dm ? "" : "none" }}
            >
              x
            </button>
            <div
              style={{
                display:
                  damage_large !== "N/A" || (this.props.edit && is_dm)
                    ? ""
                    : "none"
              }}
              className="Container"
            >
              (
              <button
                style={{ display: this.props.edit && is_dm ? "" : "none" }}
                onClick={event => this.handleInputAdj(event, weapon, "weapons")}
                name="attack_adj"
                className="button"
                id="IncrementButton"
                value="-"
              >
                -
              </button>
              <p style={{ marginRight: 5, marginLeft: 5 }}>
                To Hit:{" "}
                {(damage_large === "N/A"
                  ? toHit + dex.missile - str.toHit
                  : toHit) > 0
                  ? "+"
                  : ""}
                {damage_large === "N/A"
                  ? toHit + dex.missile - str.toHit
                  : toHit}
              </p>
              <div
                className="Container Smalltext text"
                style={{
                  display: this.props.advanced ? "" : "none",
                  marginRight: 3
                }}
              >
                <h1
                  style={{
                    display: damage_large !== "N/A" ? "" : "none",
                    marginRight: 2
                  }}
                >
                  Strength:
                </h1>
                <p
                  style={{
                    display: damage_large !== "N/A" ? "" : "none",
                    marginRight: 2
                  }}
                >
                  {str.toHit > 0 ? "+" : ""}
                  {str.toHit}
                </p>
                <h1
                  style={{
                    display: damage_large !== "N/A" ? "none" : "",
                    marginRight: 2
                  }}
                >
                  Dexterity:
                </h1>
                <p
                  style={{
                    display: damage_large !== "N/A" ? "none" : "",
                    marginRight: 2
                  }}
                >
                  {dex.missile > 0 ? "+" : ""}
                  {dex.missile}
                </p>
                <h1
                  style={{
                    display: !proficiencies.includes(weapon.name) ? "" : "none",
                    marginRight: 2
                  }}
                >
                  Non-Proficiency:
                </h1>
                <p
                  style={{
                    display: !proficiencies.includes(weapon.name) ? "" : "none",
                    marginRight: 2
                  }}
                >
                  -{nonProficiencyPenalty}
                </p>
                <h1
                  style={{
                    display: is_dm && weaponMagicAttackAdj ? "" : "none",
                    marginRight: 2
                  }}
                >
                  Magic Adj:
                </h1>
                <p
                  style={{
                    display: is_dm && weaponMagicAttackAdj ? "" : "none",
                    marginRight: 2
                  }}
                >
                  {weaponMagicAttackAdj > 0 ? "+" : ""}
                  {weaponMagicAttackAdj}
                </p>
                <h1
                  style={{
                    display:
                      race === "Elf" &&
                      (weapon.name === "Short-Sword" ||
                        weapon.name === "Long-Bow" ||
                        weapon.name === "Short-Bow" ||
                        weapon.name === "Composite-Long-Bow" ||
                        weapon.name === "Composite-Short-Bow" ||
                        weapon.name === "Long-Sword")
                        ? ""
                        : "none",
                    marginRight: 2
                  }}
                >
                  Racial Adj(Elf):
                </h1>
                <p
                  style={{
                    display:
                      race === "Elf" &&
                      (weapon.name === "Short-Sword" ||
                        weapon.name === "Long-Bow" ||
                        weapon.name === "Short-Bow" ||
                        weapon.name === "Composite-Long-Bow" ||
                        weapon.name === "Composite-Short-Bow" ||
                        weapon.name === "Long-Sword")
                        ? ""
                        : "none",
                    marginRight: 2
                  }}
                >
                  +1
                </p>
              </div>{" "}
              <button
                style={{ display: this.props.edit && is_dm ? "" : "none" }}
                onClick={event => this.handleInputAdj(event, weapon, "weapons")}
                className="button"
                id="IncrementButton"
                name="attack_adj"
                value="+"
              >
                +
              </button>
              <button
                style={{ display: this.props.edit && is_dm ? "" : "none" }}
                onClick={event => this.handleInputAdj(event, weapon, "weapons")}
                className="button"
                id="IncrementButton"
                name="damage_adj"
                value="-"
              >
                -
              </button>
              <p style={{ marginRight: 5 }}>
                Damage:{" "}
                {(damage_large !== "N/A" &&
                !(
                  name === "Hand-Axe" ||
                  name === "Club" ||
                  name === "Dagger" ||
                  name === "Dart" ||
                  name === "Hammer" ||
                  name === "Javelin" ||
                  name === "Spear"
                )
                  ? damage
                  : damage - str.damage) > 0
                  ? "+"
                  : ""}
                {damage_large !== "N/A" &&
                !(
                  name === "Hand-Axe" ||
                  name === "Club" ||
                  name === "Dagger" ||
                  name === "Dart" ||
                  name === "Hammer" ||
                  name === "Javelin" ||
                  name === "Spear"
                )
                  ? damage
                  : damage - str.damage}
              </p>
              <div
                className="Container Smalltext text"
                style={{
                  display: this.props.advanced ? "" : "none",
                  marginRight: 3
                }}
              >
                <h1
                  style={{
                    display:
                      damage_large !== "N/A" &&
                      !(
                        name === "Hand-Axe" ||
                        name === "Club" ||
                        name === "Dagger" ||
                        name === "Dart" ||
                        name === "Hammer" ||
                        name === "Javelin" ||
                        name === "Spear"
                      )
                        ? ""
                        : "none",
                    marginRight: 2
                  }}
                >
                  Strength:
                </h1>
                <p
                  style={{
                    display:
                      damage_large !== "N/A" &&
                      !(
                        name === "Hand-Axe" ||
                        name === "Club" ||
                        name === "Dagger" ||
                        name === "Dart" ||
                        name === "Hammer" ||
                        name === "Javelin" ||
                        name === "Spear"
                      )
                        ? ""
                        : "none",
                    marginRight: 2
                  }}
                >
                  {str.damage > 0 ? "+" : ""}
                  {str.damage}
                </p>
                <h1
                  style={{
                    display: is_dm && weaponMagicDamageAdj ? "" : "none",
                    marginRight: 2
                  }}
                >
                  Magic Adj:
                </h1>
                <p
                  style={{
                    display: is_dm && weaponMagicDamageAdj ? "" : "none",
                    marginRight: 2
                  }}
                >
                  {weaponMagicDamageAdj > 0 ? "+" : ""}
                  {weaponMagicDamageAdj}
                </p>
              </div>
              <button
                style={{ display: this.props.edit && is_dm ? "" : "none" }}
                onClick={event => this.handleInputAdj(event, weapon, "weapons")}
                className="button"
                id="IncrementButtonPlus"
                name="damage_adj"
                value="+"
              >
                +
              </button>
              )
            </div>
          </h1>
          <p
            style={{ display: damage_large === "N/A" ? "none" : "" }}
            className="Smalltext text"
          >
            Damage S/M: {damage_small_medium} Damage L: {damage_large}
          </p>
          <p
            style={{ display: ammoDetails.length >= 1 ? "" : "none" }}
            className="Text text"
          >
            Ammo:{ammo}
          </p>
          <div
            className="alignmentSelect"
            style={{
              display:
                this.props.edit && ammoOptions.length > 0 && is_dm
                  ? ""
                  : "none",
              width: 130,
              marginTop: 5
            }}
          >
            <select
              name="newAmmo"
              value=""
              onChange={event =>
                this.handleInputNew(event, weapon.character_weapon_id)
              }
            >
              <option value="">--Add new ammo--</option>
              {ammoOptions}
            </select>
          </div>
        </div>
      );
    });

    let weaponOptions = this.props.characterData.weapons.map(weapon => {
      return <option value={weapon.name}>Add: {weapon.name}</option>;
    });

    let armor;
    let shield;

    armorDetails.forEach(piece => {
      if (piece.name.includes("Shield")) {
        shield = piece;
      } else {
        armor = piece;
      }
    });

    let armorOptions = [];
    let shieldOptions = [];

    this.props.characterData.armor.forEach(aRmor => {
      if (!aRmor.name.includes("Shield") && aRmor.name !== (armor || {}).name) {
        armorOptions.push(<option value={aRmor.name}>{aRmor.name}</option>);
      } else if (
        aRmor.name !== (shield || {}).name &&
        aRmor.name.includes("Shield")
      ) {
        shieldOptions.push(<option value={aRmor.name}>{aRmor.name}</option>);
      }
    });

    let thac = classDetails.reduce(
      (acc, cLass) => {
        if (acc[0] > cLass.thac[0]) {
          return cLass.thac;
        } else {
          return acc;
        }
      },
      [15]
    );

    let specialAttacks = special_attack.split("&").map(entry => {
      if (entry) {
        return <p>-{entry}</p>;
      }
    });

    let rEsistances = resistances.split("&").map(entry => {
      if (entry) {
        return <p>-{entry}</p>;
      }
    });

    return (
      <div>
        <div className="SectionTitleBox">
          <h1 className="SectionTitle text">Combat:</h1>
          <button
            className="button"
            id="SectionButton"
            onClick={this.toggle}
            name="revealed"
          >
            {this.state.revealed ? "v" : ">"}
          </button>
        </div>
        <div style={{ display: this.state.revealed ? "" : "none" }}>
          <hr />
          <div className="Container">
            <h1 className="Header text">HP:</h1>
            <div className="Container">
              <button
                className="button"
                id="IncrementButton"
                onClick={this.increment}
                value="-"
                name="currentHP"
              >
                -
              </button>
              <p className="Header text">{this.state.currentHP}</p>
              <button
                className="button"
                id="IncrementButton"
                onClick={this.increment}
                value="+"
                name="currentHP"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <h1 className="Header text">Weapons:</h1>
            <WeaponsContainer columns={2} gap={5}>
              {weapons}
            </WeaponsContainer>
            <div
              className="alignmentSelect"
              style={{
                display: this.props.edit && is_dm ? "" : "none",
                marginTop: 5
              }}
            >
              <select
                name="newWeapon"
                value=""
                onChange={event => this.handleInputNew(event, character_id)}
              >
                <option value="">--Choose new Weapon--</option>
                {weaponOptions}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 5 }}>
            <h1 className="Header text">THAC:</h1>
            <div className="ContainerColumn" style={{ marginLeft: 0 }}>
              <div className="Container">
                <p className="text Text Thac">AC</p>
                <p className="text Text Thac THAC2">10</p>
                <p className="text Text Thac THAC2">9</p>
                <p className="text Text Thac">8</p>
                <p className="text Text Thac">7</p>
                <p className="text Text Thac">6</p>
                <p className="text Text Thac">5</p>
                <p className="text Text Thac">4</p>
                <p className="text Text Thac">3</p>
                <p className="text Text Thac">2</p>
                <p className="text Text Thac">1</p>
                <p className="text Text Thac">0</p>
                <p className="text Text Thac">-1</p>
                <p className="text Text Thac">-2</p>
                <p className="text Text Thac">-3</p>
                <p className="text Text Thac">-4</p>
                <p className="text Text Thac">-5</p>
                <p className="text Text Thac">-6</p>
                <p className="text Text Thac">-7</p>
                <p className="text Text Thac THAC2">-8</p>
                <p className="text Text Thac THAC2">-9</p>
                <p className="text Text Thac THAC2">-10</p>
              </div>
              <div className="Container" style={{ marginLeft: 0 }}>
                <p className="text Text Thac">Hit</p>
                <p className="text Text Thac THAC2">{thac[0]}</p>
                <p className="text Text Thac THAC2">{thac[1]}</p>
                <p className="text Text Thac">{thac[2]}</p>
                <p className="text Text Thac">{thac[3]}</p>
                <p className="text Text Thac">{thac[4]}</p>
                <p className="text Text Thac">{thac[5]}</p>
                <p className="text Text Thac">{thac[6]}</p>
                <p className="text Text Thac">{thac[7]}</p>
                <p className="text Text Thac">{thac[8]}</p>
                <p className="text Text Thac">{thac[9]}</p>
                <p className="text Text Thac">{thac[10]}</p>
                <p className="text Text Thac">{thac[11]}</p>
                <p className="text Text Thac">{thac[12]}</p>
                <p className="text Text Thac">{thac[13]}</p>
                <p className="text Text Thac">{thac[14]}</p>
                <p className="text Text Thac">{thac[15]}</p>
                <p className="text Text Thac">{thac[16]}</p>
                <p className="text Text Thac">{thac[17]}</p>
                <p className="text Text Thac THAC2">{thac[18]}</p>
                <p className="text Text Thac THAC2">{thac[19]}</p>
                <p className="text Text Thac THAC2">{thac[20]}</p>
              </div>
            </div>
          </div>
          <div style={{ display: !this.props.edit }}>
            <h1 className="Header text">
              AC:{" "}
              {10 +
                armor.ac_mod +
                shield.ac_mod +
                dex.ac -
                (is_dm ? ac_bonus + shield.ac_adj + armor.ac_adj : 0)}
            </h1>
            <h1 className="Text text" style={{ marginLeft: 5 }}>
              Shieldless:{" "}
              {10 +
                armor.ac_mod +
                dex.ac -
                (is_dm ? ac_bonus + armor.ac_adj : 0)}
            </h1>
            <h1 className="Text text" style={{ marginLeft: 5 }}>
              Rear: {10 + armor.ac_mod - (is_dm ? ac_bonus + armor.ac_adj : 0)}
            </h1>
            <div
              className="Container"
              style={{ display: this.props.edit && is_dm ? "" : "none" }}
            >
              <button
                className="button"
                id="IncrementButton"
                onClick={event =>
                  this.handleInputIncrement(event, "personalDetails")
                }
                name="ac_bonus"
                value="-"
              >
                -
              </button>
              <h1>
                {(this.props.characterChanges.personalDetails.ac_bonus === 0
                  ? 0
                  : this.props.characterChanges.personalDetails.ac_bonus ||
                    ac_bonus) > 0
                  ? "+"
                  : ""}
                {this.props.characterChanges.personalDetails.ac_bonus === 0
                  ? 0
                  : this.props.characterChanges.personalDetails.ac_bonus ||
                    ac_bonus}
              </h1>
              <button
                className="button"
                id="IncrementButton"
                onClick={event =>
                  this.handleInputIncrement(event, "personalDetails")
                }
                name="ac_bonus"
                value="+"
              >
                +
              </button>
            </div>
            <div
              className="Container Smalltext"
              style={{ display: this.props.advanced ? "" : "none" }}
            >
              <h1 style={{ marginLeft: 5 }}>Dexterity:</h1>
              <p style={{ marginLeft: 2 }}>
                {dex.ac > 0 ? "+" : ""}
                {dex.ac}
              </p>
              <h1 style={{ display: armor ? "" : "none", marginLeft: 3 }}>
                Armor: {armor.name}{" "}
                {is_dm && armor.ac_adj
                  ? ` ${armor.ac_adj > 0 ? "+" : ""}${armor.ac_adj}`
                  : ""}
              </h1>
              <p style={{ marginLeft: 2 }}>
                {armor.ac_mod - (is_dm ? armor.ac_adj : 0) > 0 ? "+" : ""}
                {armor.ac_mod - (is_dm ? armor.ac_adj : 0)}
              </p>
              <h1 style={{ display: shield ? "" : "none", marginLeft: 3 }}>
                Shield: {shield.name}{" "}
                {is_dm && shield.ac_adj
                  ? ` ${shield.ac_adj > 0 ? "+" : ""}${shield.ac_adj}`
                  : ""}
              </h1>
              <p style={{ marginLeft: 2 }}>
                {shield.ac_mod - (is_dm ? shield.ac_adj : 0) > 0 ? "+" : ""}
                {shield.ac_mod - (is_dm ? shield.ac_adj : 0)}
              </p>
              <h1
                style={{
                  display: is_dm && ac_bonus ? "" : "none",
                  marginLeft: 3
                }}
              >
                Magic Adj:
              </h1>
              <p
                style={{
                  display: is_dm && ac_bonus ? "" : "none",
                  marginLeft: 2
                }}
              >
                {ac_bonus < 0 ? "+" : ac_bonus > 0 ? "-" : ""}
                {Math.abs(ac_bonus)}{" "}
              </p>
            </div>
          </div>
          <div
            className="Container text"
            style={{
              display: armor.name === "None" && !this.props.edit ? "none" : ""
            }}
          >
            <h1 className="Header" style={{ marginRight: 3 }}>
              Armor:
            </h1>
            <p className="Text Container">
              {this.props.characterChanges.combat.newArmor.name ||
                `${armor.name} ${is_dm ? (armor.ac_adj > 0 ? "+" : "") : ""}${
                  is_dm && armor.ac_adj ? armor.ac_adj : ""
                }`}
              <div
                className="Container Text"
                style={{
                  display:
                    this.props.edit && !this.armorSelect.current.value && is_dm
                      ? ""
                      : "none"
                }}
              >
                <button
                  onClick={event => this.handleInputAdj(event, armor, "armor")}
                  className="button"
                  id="IncrementButton"
                  name="ac_adj"
                  value="-"
                >
                  -
                </button>
                {this.props.characterChanges.combat.newArmor.name
                  ? ((this.props.characterChanges.combat.newArmor[0] || armor)
                      .ac_adj > 0
                      ? "+"
                      : "") +
                      (this.props.characterChanges.combat.newArmor[0] || armor)
                        .ac_adj || 0
                  : ((this.props.characterChanges.combat.armor[0] || armor)
                      .ac_adj > 0
                      ? "+"
                      : "") +
                      (this.props.characterChanges.combat.armor[0] || armor)
                        .ac_adj || 0}
                <button
                  onClick={event => this.handleInputAdj(event, armor, "armor")}
                  className="button"
                  id="IncrementButton"
                  name="ac_adj"
                  value="+"
                >
                  +
                </button>
              </div>
            </p>
          </div>
          <div
            className="alignmentSelect"
            style={{
              display: this.props.edit && is_dm ? "" : "none",
              marginTop: 0,
              width: 135
            }}
          >
            <select
              name="newArmor"
              ref={this.armorSelect}
              value={this.props.characterChanges.combat.newArmor.name || ""}
              onChange={event => this.handleInputNew(event, character_id)}
            >
              <option value="">--Choose Armor--</option>
              <option value="">-Reset-</option>
              {armorOptions}
            </select>
          </div>
          <div
            className="Container text"
            style={{ display: shield || this.props.edit ? "" : "none" }}
          >
            <h1 className="Header">Shield:</h1>
            <p className="Text Container">
              {this.props.characterChanges.combat.newShield.name ||
                `${shield.name} ${is_dm ? (shield.ac_adj > 0 ? "+" : "") : ""}${
                  is_dm && shield.ac_adj ? shield.ac_adj : ""
                }`}
              <div
                style={{
                  display:
                    this.props.edit && !this.shieldSelect.current.value && is_dm
                      ? ""
                      : "none"
                }}
              >
                <button
                  onClick={event =>
                    this.handleInputAdj(event, shield, "shield")
                  }
                  className="button"
                  id="IncrementButton"
                  name="ac_adj"
                  value="-"
                >
                  -
                </button>
                {(this.props.characterChanges.combat.shield[0] || shield)
                  .ac_adj > 0
                  ? "+"
                  : ""}
                {(this.props.characterChanges.combat.shield[0] || shield)
                  .ac_adj || 0}
                <button
                  onClick={event =>
                    this.handleInputAdj(event, shield, "shield")
                  }
                  className="button"
                  id="IncrementButton"
                  name="ac_adj"
                  value="+"
                >
                  +
                </button>
              </div>
            </p>
          </div>
          <div
            className="alignmentSelect"
            style={{
              display: this.props.edit && is_dm ? "" : "none",
              marginTop: 0,
              width: 135
            }}
          >
            <select
              name="newShield"
              ref={this.shieldSelect}
              value={this.props.characterChanges.combat.newShield.name || ""}
              onChange={event => this.handleInputNew(event, character_id)}
            >
              <option value="">--Choose Shield--</option>
              <option value="">-Reset-</option>
              {shieldOptions}
            </select>
          </div>
          <h1 className="text Header">Saving Throws:</h1>
          <div className="text Text" style={{ width: 200 }}>
            <p className="Container Justify-End">
              Rod, Staff, or Wand:
              <p className="Saves">
                {savingThrows[0] + (is_dm ? 0 : saving_throw_adj)}
              </p>
            </p>
            <p className="Container Justify-End">
              Breath Weapons:
              <p className="Saves">
                {savingThrows[1] + (is_dm ? 0 : saving_throw_adj)}
              </p>
            </p>
            <p className="Container Justify-End">
              Death, Paralysis, Poison:
              <p className="Saves">
                {savingThrows[2] + (is_dm ? 0 : saving_throw_adj)}
              </p>
            </p>
            <p className="Container Justify-End">
              Petrification, Polymorph:
              <p className="Saves">
                {savingThrows[3] + (is_dm ? 0 : saving_throw_adj)}
              </p>
            </p>
            <p className="Container Justify-End">
              Spells:
              <p className="Saves">
                {savingThrows[4] + (is_dm ? 0 : saving_throw_adj)}
              </p>
            </p>
            <div
              className="Container Minutetext"
              style={{
                display: this.props.advanced && is_dm ? "" : "none",
                marginLeft: 5
              }}
            >
              <h1 style={{ marginRight: 2 }}>Magic Adj: </h1>
              <p>
                {saving_throw_adj > 0 ? "+" : ""}
                {saving_throw_adj}
              </p>
            </div>
            <div
              className="Container"
              style={{ display: this.props.edit && is_dm ? "" : "none" }}
            >
              <button
                className="button"
                id="IncrementButton"
                onClick={event =>
                  this.handleInputIncrement(event, "personalDetails")
                }
                name="saving_throw_adj"
                value="-"
              >
                -
              </button>
              <h1>
                {(this.props.characterChanges.personalDetails
                  .saving_throw_adj === 0
                  ? 0
                  : this.props.characterChanges.personalDetails
                      .saving_throw_adj || saving_throw_adj) > 0
                  ? "+"
                  : ""}
                {this.props.characterChanges.personalDetails
                  .saving_throw_adj === 0
                  ? 0
                  : this.props.characterChanges.personalDetails
                      .saving_throw_adj || saving_throw_adj}
              </h1>
              <button
                className="button"
                id="IncrementButton"
                onClick={event =>
                  this.handleInputIncrement(event, "personalDetails")
                }
                name="saving_throw_adj"
                value="+"
              >
                +
              </button>
            </div>
          </div>
          <div
            style={{
              display:
                resistances.length > 0 || special_attack.length > 0
                  ? ""
                  : "none"
            }}
          >
            <h1 className="Header text">Special Abilities:</h1>
            <div className="Text text">
              {rEsistances}
              {specialAttacks}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { characterChanges, rerenderCreation, characterData } = state.character;
  const { currentCampaign } = state.campaign;
  return {
    characterChanges,
    rerenderCreation,
    characterData,
    currentCampaign
  };
}

export default connect(
  mapStateToProps,
  { inputCharacterEdits }
)(Combat);
