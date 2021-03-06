import React ,{ Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
    import { saveCharacterData, clearCreation, rerenderCreation } from  '../../ducks/reducer/character_reducer.js';
import CharacterCreationLanding from './CharacterCreationLanding.jsx';
import CharacterCreation1 from './CharacterCreation1.jsx';
import CharacterCreation2 from './CharacterCreation2.jsx';
import CharacterCreation3 from './CharacterCreation3.jsx';
import CharacterCreation4 from './CharacterCreation4.jsx';
import './CharacterCreation.css';

class CharacterCreation extends Component {

    cancel = (event) => {
        const { name, campaign_id } = this.props.currentCampaign.campaignDetails
        this.props.clearCreation();
        this.props.rerenderCreation();
        this.props.toggle(event);
        this.props.history.push(`/landing/campaign/${campaign_id}/${name}`);
    }

    render() {

        const { name, campaign_id } = this.props.currentCampaign.campaignDetails

        let render;

        if (this.props.loading) {
            render = (<div >
                Creating Character ...
            </div>
            )
        } else {
            render = (<Switch>
                    <Route exact path={`/landing/campaign/${campaign_id}/${name}`} component={CharacterCreationLanding}/>
                    <Route path={`/landing/campaign/${campaign_id}/${name}/create/1`} component={CharacterCreation1}/>
                    <Route path={`/landing/campaign/${campaign_id}/${name}/create/2`} component={CharacterCreation2}/>
                    <Route path={`/landing/campaign/${campaign_id}/${name}/create/3`} component={CharacterCreation3}/>
                    <Route path={`/landing/campaign/${campaign_id}/${name}/create/4`} component={CharacterCreation4}/>
                </Switch>
            )
        }
        return (
            <div>
                {render}
                <button id='ChCreationCancel' className='button' onClick={this.cancel} name='characterCreateRevealed'>X</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loading, rerenderCreation } = state.character;
    const { currentCampaign } = state.campaign;
    return {
        loading,
        currentCampaign,
        rerenderCreation,
    }
}

export default withRouter(connect(mapStateToProps, { saveCharacterData, clearCreation, rerenderCreation })(CharacterCreation));