import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { toggle, saveCharacterData } from '../../ducks/reducer/character_reducer.js';
import axios from 'axios';
import CharacterBlock from '../CharacterBlock/CharacterBlock.jsx';
import CharacterCreation from '../CharacterCreation/CharacterCreation.jsx';
import CharacterSheetWrapper from '../CharacterSheetWrapper/CharacterSheetWrapper.jsx';
import './CharacterLanding.css';

class CharacterLanding extends Component {
    constructor() {
        super()
        
        this.state = {
             importName: '',
        }
    }

    componentWillMount = async () => {
        const res = await axios.get('/api/character/creation');
        this.props.saveCharacterData(res.data);
    }

    importCharacter = () => {
        axios.post('/api/character/import', { name: this.state.importName, campaign_id: this.props.currentCampaign.campaignDetails.campaign_id}) 
            .then(res => {
                let event = {
                    target: {
                        name: 'importRevealed'
                    }
                }
                this.props.toggle(event);
            }).catch(err => {
                alert(err.response.request.response);
                console.log(`CharacterLanding.importCharacter ${err}`);
            })
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }
    
    render() {

        let characters = this.props.currentCampaign.characterDetails.map((character, i) => {
            if (this.props.currentCampaign.campaignDetails.is_dm) {
                return (
                    <div>
                        <CharacterBlock campaign_id={this.props.currentCampaign.campaignDetails.campaign_id} campaign_name={this.props.currentCampaign.campaignDetails.name} character={character}/>
                    </div>
                )
            } else {
                if (character.user_id === this.props.currentCampaign.user_id) {
                    return (
                        <div>
                            <CharacterBlock campaign_id={this.props.currentCampaign.campaignDetails.campaign_id} campaign_name={this.props.currentCampaign.campaignDetails.name} character={character}/>
                        </div>
                    )
                }
            }
        })

        return (
            <div>
                <div
                    className={this.props.obscured 
                        ? 'Background'
                        : 'Foreground'
                        }>
                    <button onClick={this.props.handleView} name="landing">Home</button>
                    <div>
                        {characters}
                        <button
                            style={{display: this.props.currentCampaign.campaignDetails.is_dm 
                            ? 'none'
                            : ''
                            }}
                            onClick={this.props.toggle}
                            name='characterCreateRevealed'>
                            +</button>
                        <button
                            style={{display: this.props.currentCampaign.campaignDetails.is_dm 
                            ? 'none'
                            : ''
                            }}
                            onClick={this.props.toggle}
                            name='importRevealed'>
                            Import</button>
                    </div>
                </div>
                    <div
                        className="Character-Box Box"
                        style={{display: this.props.importRevealed 
                            ? ''
                            : 'none'
                        }}>
                        Import Character
                        <input type="text" placeholder="Name" name='importName' onChange={this.handleInput}/>
                        <button onClick={this.importCharacter}>Submit</button>
                        <button onClick={this.props.toggle} name="importRevealed">Cancel</button>
                    </div>
                    <div
                        className='Character-Box Box'
                        style={{display: this.props.characterCreateRevealed
                            ? ''
                            : 'none'
                        }}>
                        <CharacterCreation toggle={this.props.toggle}/>
                    </div>
                    <div
                        className='Character-Box'
                        style={{display: this.props.characterSheetRevealed
                            ? ''
                            : 'none'
                        }}>
                        <CharacterSheetWrapper toggle={this.props.toggle}/>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { currentCampaign } = state.campaign;
    const { characterCreateRevealed, characterSheetRevealed, importRevealed, obscured } = state.character;
    return {
        currentCampaign,
        characterCreateRevealed,
        characterSheetRevealed,
        importRevealed,
        obscured,
    }
}

export default connect(mapStateToProps, { toggle, saveCharacterData })(CharacterLanding);