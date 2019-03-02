import React, { Component } from "react";
import { connect } from "react-redux";
import "./Magic.css";

class Magic extends Component {
  constructor() {
    super();

    this.state = {
      revealed: false
    };
  }

  toggle = event => {
    const { name } = event.target;
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    const { is_dm } = this.props.currentCampaign.campaignDetails;
    const { classDetails, wis } = this.props.character;
    const classes = classDetails.map(cLass => {
      return cLass.class_name;
    });

    let magic_userSpells = classDetails.reduce(
      (acc, cLass) => {
        return acc.map(
          (spells, i) => spells + (cLass.magic_user_spells[i] || 0)
        );
      },
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    let illusionistSpells = classDetails.reduce(
      (acc, cLass) => {
        return acc.map(
          (spells, i) => spells + (cLass.illusionist_spells[i] || 0)
        );
      },
      [0, 0, 0, 0, 0, 0, 0]
    );

    let clericSpells = classDetails.reduce(
      (acc, cLass) => {
        return acc.map((spells, i) => spells + (cLass.cleric_spells[i] || 0));
      },
      [0, 0, 0, 0, 0, 0, 0]
    );

    let druidSpells = classDetails.reduce(
      (acc, cLass) => {
        return acc.map((spells, i) => spells + (cLass.druid_spells[i] || 0));
      },
      [0, 0, 0, 0, 0, 0, 0]
    );

    let turnClass = classDetails.reduce(
      (acc, cLass) => {
        let level = 0;
        if (cLass.class_name === "Cleric") {
          level = cLass.level;
        } else if (cLass.class_name === "Paladin") {
          level = cLass.level - 2;
        }
        if (acc.level < level) {
          return cLass;
        } else {
          return acc;
        }
      },
      { level: 0, turn_undead: [] }
    );

    let render;
    if (this.state.revealed) {
      render = (
        <div>
          <div className="SectionTitleBox">
            <h1 className="SectionTitle text">Magic:</h1>
            <button
              className="button"
              id="SectionButton"
              onClick={this.toggle}
              name="revealed"
            >
              v
            </button>
          </div>
          <hr />
          <div
            className="text"
            style={{
              display:
                (classes.includes("Magic-User") ||
                  classes.includes("Ranger")) &&
                magic_userSpells[0]
                  ? ""
                  : "none"
            }}
          >
            <h1 className="Header Magictitle">Arcane Spells:</h1>
            <div className="Container">
              <div style={{ display: magic_userSpells[0] ? "" : "none" }}>
                <p className="Spell">
                  1<p className="sup">st</p>
                </p>
                <p className="Spell">{magic_userSpells[0]}</p>
              </div>
              <div style={{ display: magic_userSpells[1] ? "" : "none" }}>
                <p className="Spell">
                  2<p className="sup">nd</p>
                </p>
                <p className="Spell">{magic_userSpells[1]}</p>
              </div>
              <div style={{ display: magic_userSpells[2] ? "" : "none" }}>
                <p className="Spell">
                  3<p className="sup">rd</p>
                </p>
                <p className="Spell">{magic_userSpells[2]}</p>
              </div>
              <div style={{ display: magic_userSpells[3] ? "" : "none" }}>
                <p className="Spell">
                  4<p className="sup">th</p>
                </p>
                <p className="Spell">{magic_userSpells[3]}</p>
              </div>
              <div style={{ display: magic_userSpells[4] ? "" : "none" }}>
                <p className="Spell">
                  5<p className="sup">th</p>
                </p>
                <p className="Spell">{magic_userSpells[4]}</p>
              </div>
              <div style={{ display: magic_userSpells[5] ? "" : "none" }}>
                <p className="Spell">
                  6<p className="sup">th</p>
                </p>
                <p className="Spell">{magic_userSpells[5]}</p>
              </div>
              <div style={{ display: magic_userSpells[6] ? "" : "none" }}>
                <p className="Spell">
                  7<p className="sup">th</p>
                </p>
                <p className="Spell">{magic_userSpells[6]}</p>
              </div>
              <div style={{ display: magic_userSpells[7] ? "" : "none" }}>
                <p className="Spell">
                  8<p className="sup">th</p>
                </p>
                <p className="Spell">{magic_userSpells[7]}</p>
              </div>
              <div style={{ display: magic_userSpells[8] ? "" : "none" }}>
                <p className="Spell">
                  9<p className="sup">th</p>
                </p>
                <p className="Spell">{magic_userSpells[8]}</p>
              </div>
            </div>
          </div>
          <div
            className="text"
            style={{ display: classes.includes("Illusionist") ? "" : "none" }}
          >
            <h1 className="Header Magictitle">Illusion Spells:</h1>
            <div className="Container">
              <div style={{ display: illusionistSpells[0] ? "" : "none" }}>
                <p className="Spell">
                  1<p className="sup">st</p>
                </p>
                <p className="Spell">{illusionistSpells[0]}</p>
              </div>
              <div style={{ display: illusionistSpells[1] ? "" : "none" }}>
                <p className="Spell">
                  2<p className="sup">nd</p>
                </p>
                <p className="Spell">{illusionistSpells[1]}</p>
              </div>
              <div style={{ display: illusionistSpells[2] ? "" : "none" }}>
                <p className="Spell">
                  3<p className="sup">rd</p>
                </p>
                <p className="Spell">{illusionistSpells[2]}</p>
              </div>
              <div style={{ display: illusionistSpells[3] ? "" : "none" }}>
                <p className="Spell">
                  4<p className="sup">th</p>
                </p>
                <p className="Spell">{illusionistSpells[3]}</p>
              </div>
              <div style={{ display: illusionistSpells[4] ? "" : "none" }}>
                <p className="Spell">
                  5<p className="sup">th</p>
                </p>
                <p className="Spell">{illusionistSpells[4]}</p>
              </div>
              <div style={{ display: illusionistSpells[5] ? "" : "none" }}>
                <p className="Spell">
                  6<p className="sup">th</p>
                </p>
                <p className="Spell">{illusionistSpells[5]}</p>
              </div>
              <div style={{ display: illusionistSpells[6] ? "" : "none" }}>
                <p className="Spell">
                  7<p className="sup">th</p>
                </p>
                <p className="Spell">{illusionistSpells[6]}</p>
              </div>
            </div>
          </div>
          <div
            className="text"
            style={{
              display:
                classes.includes("Cleric") || classes.includes("Paladin")
                  ? ""
                  : "none"
            }}
          >
            <h1 className="Header Magictitle">Clerical Spells:</h1>
            <div className="Container">
              <div style={{ display: clericSpells[0] ? "" : "none" }}>
                <p className="Spell">
                  1<p className="sup">st</p>
                </p>
                <p className="Spell">
                  {clericSpells[0] +
                    (classes.includes("Cleric") ? wis.spells[0] || 0 : 0)}
                </p>
              </div>
              <div style={{ display: clericSpells[1] ? "" : "none" }}>
                <p className="Spell">
                  2<p className="sup">nd</p>
                </p>
                <p className="Spell">
                  {clericSpells[1] +
                    (classes.includes("Cleric") ? wis.spells[1] || 0 : 0)}
                </p>
              </div>
              <div style={{ display: clericSpells[2] ? "" : "none" }}>
                <p className="Spell">
                  3<p className="sup">rd</p>
                </p>
                <p className="Spell">
                  {clericSpells[2] +
                    (classes.includes("Cleric") ? wis.spells[2] || 0 : 0)}
                </p>
              </div>
              <div style={{ display: clericSpells[3] ? "" : "none" }}>
                <p className="Spell">
                  4<p className="sup">th</p>
                </p>
                <p className="Spell">
                  {clericSpells[3] +
                    (classes.includes("Cleric") ? wis.spells[3] || 0 : 0)}
                </p>
              </div>
              <div style={{ display: clericSpells[4] ? "" : "none" }}>
                <p className="Spell">
                  5<p className="sup">th</p>
                </p>
                <p className="Spell">
                  {clericSpells[4] +
                    (classes.includes("Cleric") ? wis.spells[4] || 0 : 0)}
                </p>
              </div>
              <div style={{ display: clericSpells[5] ? "" : "none" }}>
                <p className="Spell">
                  6<p className="sup">th</p>
                </p>
                <p className="Spell">
                  {clericSpells[5] +
                    (classes.includes("Cleric") ? wis.spells[5] || 0 : 0)}
                </p>
              </div>
              <div style={{ display: clericSpells[6] ? "" : "none" }}>
                <p className="Spell">
                  7<p className="sup">th</p>
                </p>
                <p className="Spell">
                  {clericSpells[6] +
                    (classes.includes("Cleric") ? wis.spells[6] || 0 : 0)}
                </p>
              </div>
            </div>
          </div>
          <div
            className="text"
            style={{
              display:
                classes.includes("Druid") || classes.includes("Ranger")
                  ? ""
                  : "none"
            }}
          >
            <h1 className="Header Magictitle">Druidic Spells:</h1>
            <div className="Container">
              <div style={{ display: druidSpells[0] ? "" : "none" }}>
                <p className="Spell">
                  1<p className="sup">st</p>
                </p>
                <p className="Spell">{druidSpells[0] + (wis.spells[0] || 0)}</p>
              </div>
              <div style={{ display: druidSpells[1] ? "" : "none" }}>
                <p className="Spell">
                  2<p className="sup">nd</p>
                </p>
                <p className="Spell">{druidSpells[1] + (wis.spells[1] || 0)}</p>
              </div>
              <div style={{ display: druidSpells[2] ? "" : "none" }}>
                <p className="Spell">
                  3<p className="sup">rd</p>
                </p>
                <p className="Spell">{druidSpells[2] + (wis.spells[2] || 0)}</p>
              </div>
              <div style={{ display: druidSpells[3] ? "" : "none" }}>
                <p className="Spell">
                  4<p className="sup">th</p>
                </p>
                <p className="Spell">{druidSpells[3] + (wis.spells[3] || 0)}</p>
              </div>
              <div style={{ display: druidSpells[4] ? "" : "none" }}>
                <p className="Spell">
                  5<p className="sup">th</p>
                </p>
                <p className="Spell">{druidSpells[4] + (wis.spells[4] || 0)}</p>
              </div>
              <div style={{ display: druidSpells[5] ? "" : "none" }}>
                <p className="Spell">
                  6<p className="sup">th</p>
                </p>
                <p className="Spell">{druidSpells[5] + (wis.spells[5] || 0)}</p>
              </div>
              <div style={{ display: druidSpells[6] ? "" : "none" }}>
                <p className="Spell">
                  7<p className="sup">th</p>
                </p>
                <p className="Spell">{druidSpells[6] + (wis.spells[6] || 0)}</p>
              </div>
            </div>
          </div>
          <div
            className="text"
            style={{
              display:
                classes.includes("Cleric") ||
                (classes.includes("Paladin") && is_dm)
                  ? ""
                  : "none"
            }}
          >
            <h1 className="Header">Turn Undead:</h1>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Skeleton: {turnClass.turn_undead[0] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Zombie: {turnClass.turn_undead[1] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Ghoul: {turnClass.turn_undead[2] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Shadow: {turnClass.turn_undead[3] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Wight: {turnClass.turn_undead[4] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Ghast: {turnClass.turn_undead[5] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Wraith: {turnClass.turn_undead[6] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Mummy: {turnClass.turn_undead[7] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Spectre: {turnClass.turn_undead[8] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Vampire: {turnClass.turn_undead[9] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Ghost: {turnClass.turn_undead[10] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Lich: {turnClass.turn_undead[11] || "-"}
            </p>
            <p className="Smalltext" style={{ marginLeft: 5 }}>
              Fiend: {turnClass.turn_undead[12] || "-"}
            </p>
          </div>
        </div>
      );
    } else {
      render = (
        <div>
          <div className="SectionTitleBox">
            <h1 className="SectionTitle text">Magic:</h1>
            <button
              className="button"
              id="SectionButton"
              onClick={this.toggle}
              name="revealed"
            >
              >
            </button>
          </div>
        </div>
      );
    }

    return <div>{render}</div>;
  }
}

function mapStateToProps(state) {
  const { currentCampaign } = state.campaign;
  return {
    currentCampaign
  };
}

export default connect(mapStateToProps)(Magic);
