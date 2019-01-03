import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
    import { handleCreationInput, rerenderCreation } from '../../ducks/reducer/character_reducer.js';


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
            <div>
                <h1>STR <p>{str}</p></h1>
                        <button onClick={this.handleInput} name='str' value='-'>-</button>
                        <button onClick={this.handleInput} name='str' value='+'>+</button>
                <h1>INT <p>{int}</p></h1>
                        <button onClick={this.handleInput} name='int' value='-'>-</button>
                        <button onClick={this.handleInput} name='int' value='+'>+</button>
                <h1>WIS <p>{wis}</p></h1>
                        <button onClick={this.handleInput} name='wis' value='-'>-</button>
                        <button onClick={this.handleInput} name='wis' value='+'>+</button>
                <h1>DEX <p>{dex}</p></h1>
                        <button onClick={this.handleInput} name='dex' value='-'>-</button>
                        <button onClick={this.handleInput} name='dex' value='+'>+</button>
                <h1>CON <p>{con}</p></h1>
                        <button onClick={this.handleInput} name='con' value='-'>-</button>
                        <button onClick={this.handleInput} name='con' value='+'>+</button>
                <h1>CHA <p>{cha}</p></h1>
                        <button onClick={this.handleInput} name='cha' value='-'>-</button>        
                        <button onClick={this.handleInput} name='cha' value='+'>+</button>
                <Link to={`/landing/campaign/${campaign_id}/${name}`}>
                    <button
                        onClick={this.props.rerenderCreation}>
                            Prev Step
                    </button>
                </Link>
                <Link to={`/landing/campaign/${campaign_id}/${name}/create/2`}>
                    <button
                        onClick={this.props.rerenderCreation}>
                            Next Step
                    </button>
                </Link>
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