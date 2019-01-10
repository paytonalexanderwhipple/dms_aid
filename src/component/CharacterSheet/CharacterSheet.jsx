import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { clearCharacterEdits, submitCharacterEdits, saveCharacterData, toggle, toggleLoad } from '../../ducks/reducer/character_reducer.js';
    import { setCurrentCampaign } from '../../ducks/reducer/campaign_reducer.js';
import axios from 'axios'
import PersonalDetails from './PersonalDetails.jsx';
import Abilites from './Abilities.jsx';
import Combat from './Combat.jsx';
import Magic from './Magic.jsx';
import Inventory from './Inventory.jsx';
import Notes from './Notes.jsx';
import XP from './XP.jsx';
import './CharacterSheet.css';
import { runInThisContext } from 'vm';

class CharacterSheet extends Component {
    constructor() {
        super()
        
        this.state = {
            character: {},
            edit: false,
            advancedDetails: false,
        }
    }

    componentWillMount = async () => {
        const { campaignDetails, characterDetails } = this.props.currentCampaign;
        const { campaign_id, name } = campaignDetails;
        let currentCharacter = {};
        for (let i = 0; i < this.props.currentCampaign.characterDetails.length; i++) {
            if (characterDetails[i].character_id == this.props.match.params.character_id) {
                currentCharacter = characterDetails[i];
            }
        }
        this.setState({character: currentCharacter});
    }

    toggle = (event) => {
        const { name } = event.target;
        this.setState({[name]: !this.state[name]});
        if (name === 'edit') {
            this.props.clearCharacterEdits();
            this.setState({advancedDetails: false});
        }
    }

    submitChanges = async () => {
        this.props.submitCharacterEdits(this.state.character, this.props.characterChanges);
        await setTimeout(async () => {
            const { campaign_id, name } = this.props.currentCampaign.campaignDetails
            this.props.history.push(`/landing/campaign/${campaign_id}/${name}`);
            const res = await axios.get(`/api/campaign?campaign_id=${this.props.currentCampaign.campaignDetails.campaign_id}`);
            this.props.setCurrentCampaign(res.data);
                let event = {
                    target: {
                        name: 'characterSheetRevealed'
                    }
                }
            this.props.toggle(event);
            this.props.toggleLoad();
            this.props.clearCharacterEdits();
        }, 500);
    }

    removeCharacter = () => {
        const { campaign_id, character_id } = this.state.character;
        axios.delete(`/api/character?campaign_id=${campaign_id}&character_id=${character_id}`)
            .then(async res => {
                const { campaign_id, name } = this.props.currentCampaign.campaignDetails
                this.props.history.push(`/landing/campaign/${campaign_id}/${name}`);
                let results = await axios.get(`/api/campaign?campaign_id=${campaign_id}`);
                this.props.setCurrentCampaign(results.data);
                this.props.toggle({target: {name: 'characterSheetRevealed'}});
                this.props.toggleLoad();
            }).catch(err => {
                console.log(`CharacterSheet.removeCharacter ${err}`);
            });
    }
    
    render() {

        let render;

        if (this.props.loading) {
            render = (<div>
                Submiting Changes...
            </div>)
        } else {
            render = (<div>
                <button name='edit' onClick={this.toggle}>
                    {this.state.edit
                        ? 'Cancel'
                        : 'Edit'
                    }
                </button>
                <button name='advancedDetails'
                    onClick={this.toggle}
                    style={{display: this.state.edit
                        ? 'none'
                        : ''
                    }}>
                    Advanced Stats
                </button>
                <Abilites character={this.state.character} advanced={this.state.advancedDetails} edit={this.state.edit}/>
                <Combat character={this.state.character} advanced={this.state.advancedDetails} edit={this.state.edit}/>
                <Magic character={this.state.character} advanced={this.state.advancedDetails} edit={this.state.edit}/>
                <Inventory character={this.state.character} advanced={this.state.advancedDetails} edit={this.state.edit}/>
                <PersonalDetails character={this.state.character} advanced={this.state.advancedDetails} edit={this.state.edit}/>
                <Notes character={this.state.character} advanced={this.state.advancedDetails} edit={this.state.edit}/>
                <div
                    style={{display: this.props.currentCampaign.campaignDetails.is_dm ? '' : 'none'}}>
                    <XP character={this.state.character} edit={this.state.edit} advanced={this.state.advancedDetails}/>
                </div>
                <button
                    style={{display: this.state.edit
                        ? ''
                        : 'none'
                    }}
                    onClick={this.submitChanges}>
                    Submit
                </button>
                <button
                    onClick={this.removeCharacter}>
                    Remove
                </button>
            </div>)
        }

        return (
            <div>
               {render}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loading, characterChanges, characterData } = state.character
    const { currentCampaign } = state.campaign;
    return {
        loading,
        characterChanges,
        currentCampaign,
        characterData,
    }
}

export default connect(mapStateToProps, { clearCharacterEdits, submitCharacterEdits, setCurrentCampaign, toggle, toggleLoad, saveCharacterData })(CharacterSheet);