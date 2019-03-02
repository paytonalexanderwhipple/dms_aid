import React, { Component } from "react";
import { connect } from "react-redux";
import {
  toggle,
  saveCharacterData
} from "../../ducks/reducer/character_reducer.js";
import axios from "axios";
import CharacterBlock from "../CharacterBlock/CharacterBlock.jsx";
import CharacterCreation from "../CharacterCreation/CharacterCreation.jsx";
import CharacterSheetWrapper from "../CharacterSheetWrapper/CharacterSheetWrapper.jsx";
import "./CharacterLanding.css";

class CharacterLanding extends Component {
  constructor() {
    super();

    this.state = {
      importName: ""
    };
  }

  componentWillMount = async () => {
    const res = await axios.get("/api/character/creation");
    this.props.saveCharacterData(res.data);
  };

  importCharacter = () => {
    axios
      .post("/api/character/import", {
        name: this.state.importName,
        campaign_id: this.props.currentCampaign.campaignDetails.campaign_id
      })
      .then(res => {
        let event = {
          target: {
            name: "importRevealed"
          }
        };
        this.props.toggle(event);
      })
      .catch(err => {
        alert(err.response.request.response);
        console.log(`CharacterLanding.importCharacter ${err}`);
      });
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    let characters = this.props.currentCampaign.characterDetails.map(
      (character, i) => {
        if (this.props.currentCampaign.campaignDetails.is_dm) {
          return (
            <div>
              <CharacterBlock
                campaign_id={
                  this.props.currentCampaign.campaignDetails.campaign_id
                }
                campaign_name={this.props.currentCampaign.campaignDetails.name}
                character={character}
              />
            </div>
          );
        } else {
          if (character.user_id === this.props.currentCampaign.user_id) {
            return (
              <div>
                <CharacterBlock
                  campaign_id={
                    this.props.currentCampaign.campaignDetails.campaign_id
                  }
                  campaign_name={
                    this.props.currentCampaign.campaignDetails.name
                  }
                  character={character}
                />
              </div>
            );
          }
        }
      }
    );

    return (
      <div className="CharacterLanding">
        <div
          className={
            this.props.obscured
              ? "Background CharacterContainer"
              : "Foreground CharacterContainer"
          }
        >
          <button
            className="CharacterButtonsContainer"
            onClick={this.props.handleView}
            name="landing"
          >
            <button
              className="homeButton text"
              onClick={this.props.handleView}
              name="landing"
            >
              H
            </button>
            <button
              className="homeButton text"
              onClick={this.props.handleView}
              name="landing"
            >
              o
            </button>
            <button
              className="homeButton text"
              onClick={this.props.handleView}
              name="landing"
            >
              m
            </button>
            <button
              className="homeButton text"
              onClick={this.props.handleView}
              name="landing"
            >
              e
            </button>
          </button>
          <div className="GridForCorners paper">
            <div className="corner TL">
              <div className="c1 brown" />
              <div className="c2 brown" />
              <div className="c3 brown" />
            </div>
            <div className="corner TR">
              <div className="c1 brown" />
              <div className="c2 brown" />
              <div className="c4 brown" />
            </div>
            <div className="CharacterDisplayBox">
              {characters}
              <div className="NewButtonBox paper">
                <button
                  onClick={this.props.toggle}
                  name="characterCreateRevealed"
                  id="ChCreationButton"
                  className="button paper"
                >
                  +
                </button>
              </div>
            </div>
            <div className="corner BL">
              <div className="c1 brown" />
              <div className="c3 brown" />
              <div className="c4 brown" />
            </div>
            <div className="corner BR">
              <div className="c2 brown" />
              <div className="c3 brown" />
              <div className="c4 brown" />
            </div>
          </div>
          <button
            onClick={this.props.toggle}
            name="importRevealed"
            id="ChImportButton"
            className="button paper"
          >
            Import
          </button>
        </div>
        <div
          className="Character-Box paper ImportBox"
          style={{ display: this.props.importRevealed ? "" : "none" }}
        >
          <input
            className="input"
            id="ImportInput"
            placeholder="Name"
            type="text"
            placeholder="Name"
            name="importName"
            onChange={this.handleInput}
          />
          <button
            className="button"
            id="prevStep"
            onClick={this.importCharacter}
          >
            Import
          </button>
          <button
            className="button"
            id="ChCreationCancel"
            onClick={event => {
              this.props.toggle(event);
              this.setState({ importName: "" });
            }}
            name="importRevealed"
          >
            X
          </button>
        </div>
        <div
          className="Character-Box paper"
          style={{ display: this.props.characterCreateRevealed ? "" : "none" }}
        >
          <CharacterCreation toggle={this.props.toggle} />
        </div>
        <div
          style={{ display: this.props.characterSheetRevealed ? "" : "none" }}
        >
          <CharacterSheetWrapper toggle={this.props.toggle} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currentCampaign } = state.campaign;
  const {
    characterCreateRevealed,
    characterSheetRevealed,
    importRevealed,
    obscured
  } = state.character;
  return {
    currentCampaign,
    characterCreateRevealed,
    characterSheetRevealed,
    importRevealed,
    obscured
  };
}

export default connect(
  mapStateToProps,
  { toggle, saveCharacterData }
)(CharacterLanding);
