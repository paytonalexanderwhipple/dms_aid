import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { clearCharacterEdits } from '../../ducks/reducer/character_reducer.js';
import PersonalDetails from './PersonalDetails.jsx';
import Abilites from './Abilities.jsx';
import Combat from './Combat.jsx';
import Magic from './Magic.jsx';
import Inventory from './Inventory.jsx';
import Notes from './Notes.jsx';

class CharacterSheet extends Component {
    constructor() {
        super()
        
        this.state = {
            character: {},
            edit: false, 
        }
    }

    componentWillMount = () => {
        const { characterDetails } = this.props.currentCampaign
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
        }
    }

    
    render() {
        return (
            <div>
                <button name='edit' onClick={this.toggle}>
                    {this.state.edit
                        ? 'Cancel'
                        : 'Edit'
                    }
                </button>
                <Abilites character={this.state.character} edit={this.state.edit}/>
                <Combat character={this.state.character} edit={this.state.edit}/>
                <Magic character={this.state.character} edit={this.state.edit}/>
                <Inventory character={this.state.character} edit={this.state.edit}/>
                <PersonalDetails character={this.state.character} edit={this.state.edit}/>
                <Notes character={this.state.character} edit={this.state.edit}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { currentCampaign } = state.campaign;
    return {
        currentCampaign,
    }
}

export default connect(mapStateToProps, { clearCharacterEdits })(CharacterSheet);