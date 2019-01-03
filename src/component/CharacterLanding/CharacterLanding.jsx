import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CharacterBlock from '../CharacterBlock/CharacterBlock.jsx';
import CharacterCreation from '../CharacterCreation/CharacterCreation.jsx';
import CharacterSheetWrapper from '../CharacterSheetWrapper/CharacterSheetWrapper.jsx';
import './CharacterLanding.css'

class CharacterLanding extends Component {
    constructor() {
        super()
        
        this.state = {
             importRevealed: false,
             obscured: false,
             importName: '',
             characterCreateRevealed: false,
             characterSheetRevealed: false,
             currentCharacter: 0,
        }
    }

    importCharacter = () => {
        axios.post('/api/character/import', { name: this.state.importName, campaign_id: this.props.currentCampaign.campaignDetails.campaign_id}) 
            .then(res => {
                let event = {
                    target: {
                        name: 'importRevealed'
                    }
                }
                this.toggle(event);
            }).catch(err => {
                alert(err.response.request.response);
                console.log(`CharacterLanding.importCharacter ${err}`);
            })
    }

    toggle = (event, character_id = 0) => {
        const { name } = event.target;
        this.setState({[name]: !this.state[name], obscured: !this.state.obscured, currentCharacter: character_id});
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
                        <CharacterBlock campaign_id={this.props.currentCampaign.campaignDetails.campaign_id} campaign_name={this.props.currentCampaign.campaignDetails.name} character={character} toggle={this.toggle}/>
                    </div>
                )
            } else {
                if (character.user_id === this.props.currentCampaign.user_id) {
                    return (
                        <div>
                            <CharacterBlock campaign_id={this.props.currentCampaign.campaignDetails.campaign_id} campaign_name={this.props.currentCampaign.campaignDetails.name} character={character} toggle={this.toggle}/>
                        </div>
                    )
                }
            }
        })

        return (
            <div>
                <div
                    className={this.state.obscured 
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
                            onClick={this.toggle}
                            name='characterCreateRevealed'>
                            +</button>
                        <button
                            style={{display: this.props.currentCampaign.campaignDetails.is_dm 
                            ? 'none'
                            : ''
                            }}
                            onClick={this.toggle}
                            name='importRevealed'>
                            Import</button>
                    </div>
                </div>
                    <div
                        className="Character-Box Box"
                        style={{display: this.state.importRevealed 
                            ? ''
                            : 'none'
                        }}>
                        Import Character
                        <input type="text" placeholder="Name" name='importName' onChange={this.handleInput}/>
                        <button onClick={this.importCharacter}>Submit</button>
                        <button onClick={this.toggle} name="importRevealed">Cancel</button>
                    </div>
                    <div
                        className='Character-Box Box'
                        style={{display: this.state.characterCreateRevealed
                            ? ''
                            : 'none'
                        }}>
                        <CharacterCreation toggle={this.toggle}/>
                    </div>
                    <div
                        className='Character-Box'
                        style={{display: this.state.characterSheetRevealed
                            ? ''
                            : 'none'
                        }}>
                        <CharacterSheetWrapper toggle={this.toggle} character_id={this.state.currentCharacter}/>
                    </div>
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

export default connect(mapStateToProps)(CharacterLanding);