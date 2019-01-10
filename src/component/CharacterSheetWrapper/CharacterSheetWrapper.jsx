import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { clearCharacterEdits } from '../../ducks/reducer/character_reducer.js';
import { Switch, Route, Link, withRouter, Redirect } from 'react-router-dom';
import CharacterSheet from '../CharacterSheet/CharacterSheet.jsx';

class CharacterSheetWrapper extends Component {
    constructor() {
        super()
        
        this.state = {
            
        }
    }

    componentWillMount = () => {
        if (!this.props.characterData.classes) {
            const { campaign_id, name } = this.props.currentCampaign.campaignDetails;
            this.props.history.push(`/landing/campaign/${campaign_id}/${name}`);
            if (this.props.characterSheetRevealed) {
                this.props.toggle({target: {name:"characterSheetRevealed"}});
            }
        }
    }
    
    render() {

        const { campaign_id, name } = this.props.currentCampaign.campaignDetails;

        if (!this.props.characterData.classes) {
           return <Redirect to={`/landing/campaign/${campaign_id}/${name}`}/>;
        }

        return (
            <div className='bigbox'>
                <Link to={`/landing/campaign/${campaign_id}/${name}`}>
                    <button name="characterSheetRevealed" onClick={this.props.toggle}>X</button>
                </Link>
                <Switch>
                    <Route exact path={`/landing/campaign/${campaign_id}/${name}/sheet/:character_id`} component={CharacterSheet}/>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { currentCampaign } = state.campaign;
    const { rerenderCreation, characterData, characterSheetRevealed } = state.character;
    return {
        currentCampaign,
        rerenderCreation,
        characterData,
        characterSheetRevealed,
    }
}

export default withRouter(connect(mapStateToProps, { clearCharacterEdits })(CharacterSheetWrapper));