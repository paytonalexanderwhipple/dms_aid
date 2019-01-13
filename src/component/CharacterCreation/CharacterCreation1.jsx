import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
    import { handleCreationInput, rerenderCreation } from '../../ducks/reducer/character_reducer.js';
import './CharacterCreation1.css';

class CharacterCreation1 extends Component {

    handleInput = (event) => {
        const { name, value } = event.target;
        let stat = this.props.characterCreation[name];
        if (value === '+') {
            stat += 1
        } else {
            stat -= 1
        }
        if ( 3 <= stat && stat <= 18 ) {
            this.props.handleCreationInput(name, stat);
        }
    }
    
    render() {

        const { campaign_id, name } = this.props.currentCampaign.campaignDetails

        const { str, int, wis, dex, con, cha } = this.props.characterCreation

        return (
            <div >
                <div className='statContainerCh1'>
                    <h1 className='StatNameCH1 text'>STR: </h1>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='str' value='-'>-</button>
                    <p className='text CreationStatsNums'>{str}</p>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='str' value='+'>+</button>
                </div>
                <div className='statContainerCh1'>
                    <h1 className='StatNameCH1 text'>INT: </h1>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='int' value='-'>-</button>
                    <p className='text CreationStatsNums'>{int}</p>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='int' value='+'>+</button>
                </div>
                <div className='statContainerCh1'>
                    <h1 className='StatNameCH1 text'>WIS: </h1>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='wis' value='-'>-</button>
                    <p className='text CreationStatsNums'>{wis}</p>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='wis' value='+'>+</button>
                </div>
                <div className='statContainerCh1'>
                    <h1 className='StatNameCH1 text'>DEX: </h1>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='dex' value='-'>-</button>
                    <p className='text CreationStatsNums'>{dex}</p>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='dex' value='+'>+</button>
                </div>
                <div className='statContainerCh1'>
                    <h1 className='StatNameCH1 text'>CON: </h1>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='con' value='-'>-</button>
                    <p className='text CreationStatsNums'>{con}</p>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='con' value='+'>+</button>
                </div>
                <div className='statContainerCh1'>
                    <h1 className='StatNameCH1 text'>CHA: </h1>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='cha' value='-'>-</button>        
                    <p className='text CreationStatsNums'>{cha}</p>
                    <button className='button' id='IncrementButton' onClick={this.handleInput} name='cha' value='+'>+</button>
                </div>
                <div className='Ch1ButtonBox'>
                    <Link to={`/landing/campaign/${campaign_id}/${name}`}>
                        <button
                            id='prevStep'
                            className='button'
                            onClick={this.props.rerenderCreation}>
                                Prev Step
                        </button>
                    </Link>
                    <Link to={`/landing/campaign/${campaign_id}/${name}/create/2`}>
                        <button
                            id='nextStep'
                            className='button'
                            onClick={this.props.rerenderCreation}>
                                Next Step
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { characterCreation } = state.character;
    const { currentCampaign } = state.campaign
    return { 
        characterCreation,
        currentCampaign,
    }
}

export default connect(mapStateToProps, { handleCreationInput, rerenderCreation })(CharacterCreation1);