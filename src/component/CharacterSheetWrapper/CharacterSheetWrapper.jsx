import React ,{ Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import CharacterSheet from '../CharacterSheet/CharacterSheet.jsx';

class CharacterSheetWrapper extends Component {
    constructor() {
        super()
        
        this.state = {
            
        }
    }
    
    render() {

        const { campaign_id, name } = this.props.currentCampaign.campaignDetails

        return (
            <div className='bigbox'>
                <Link to={`/landing/campaign/${campaign_id}/${name}`}>
                    <button name="characterSheetRevealed" onClick={this.props.toggle}>X</button>
                </Link>
                <Switch>
                    <Route path={`/landing/campaign/${campaign_id}/${name}/sheet/:character_id`} component={CharacterSheet}/>
                </Switch>
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

export default connect(mapStateToProps)(CharacterSheetWrapper);