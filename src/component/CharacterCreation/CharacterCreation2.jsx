import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
    import { handleCreationInput, rerenderCreation } from '../../ducks/reducer/character_reducer.js';


class CharacterCreation2 extends Component {
    constructor() {
        super()
        
        this.state = {
            advance: false,
        }
    }

    componentDidMount = () => {
        const { race } = this.props.characterCreation
        if (race && !this.state.advance) {
            this.setState({advance: true});
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.props.handleCreationInput(name, value);
    }

    componentDidUpdate = () => {
        const { race } = this.props.characterCreation
        if (race && !this.state.advance) {
            this.setState({advance: true});
        }
    }
    
    render() {

        const { campaign_id, name } = this.props.currentCampaign.campaignDetails;

        const { str, int, wis, dex, con, cha } = this.props.characterCreation;
 
        const eligableRaces = this.props.characterData.races.filter(race => {
            const { min_stats, max_stats} = race;
            const [ minStr, minInt, minWis, minDex, minCon, minCha ] = min_stats;
            const [ maxStr, maxInt, maxWis, maxDex, maxCon, maxCha ] = max_stats;
            return (
                minStr <= str && str <= maxStr &&
                minInt <= int && int <= maxInt &&
                minWis <= wis && wis <= maxWis &&
                minDex <= dex && dex <= maxDex &&
                minCon <= con && con <= maxCon &&
                minCha <= cha && cha <= maxCha 
            )
        })

        const raceOptions = eligableRaces.map((race, i) => {
            return (
                <option value={race.name} key={i}>
                    {race.name}
                </option>
            )
        })

        return (
            <div>
                <div className='alignmentSelect'>
                    <select name="race" onChange={this.handleInput} value={this.props.characterCreation.race}>
                        <option value="">--Choose your race--</option>
                        {raceOptions}
                    </select>
                </div>
                <Link to={`/landing/campaign/${campaign_id}/${name}/create/1`}>
                    <button
                        className='button'
                        id='prevStep'
                        onClick={this.props.rerenderCreation}>
                            Prev Step
                    </button>
                </Link>
                <Link to={`/landing/campaign/${campaign_id}/${name}/create/3`}>
                    <button
                        className='button'
                        id='nextStep'
                        style={{display: this.state.advance
                            ? ''
                            : 'none'
                        }}
                        onClick={this.props.rerenderCreation}>
                            Next Step
                        </button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { characterCreation, characterData, rerenderCreation } = state.character;
    const { currentCampaign } = state.campaign
    return { 
        characterCreation,
        characterData,
        rerenderCreation,
        currentCampaign,
    }
}

export default connect(mapStateToProps, { handleCreationInput, rerenderCreation })(CharacterCreation2);