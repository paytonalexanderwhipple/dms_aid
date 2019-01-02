import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
    import { handleCreationInput, rerenderCreation } from '../../ducks/reducer/character_reducer.js';


class CharacterCreation3 extends Component {
    constructor() {
        super()
        
        this.state = {
            advance: false,
        }
    }

    componentDidMount = () => {
        const { cLass } = this.props.characterCreation
        if (cLass && !this.state.advance) {
            this.setState({advance: true});
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.props.handleCreationInput(name, value);
    }

    componentDidUpdate = () => {
        const { cLass } = this.props.characterCreation
        if (cLass && !this.state.advance) {
            this.setState({advance: true});
        }
    }
    
    render() {

        const { campaign_id, name } = this.props.currentCampaign.campaignDetails

        const { str, int, wis, dex, con, cha, race, alignment } = this.props.characterCreation;
        const raceData = this.props.characterData.races.filter(rAce => {
            return rAce.name === race
        })[0];
        const stats = [str, int, wis, dex, con, cha];
        const modStats = stats.map((stat, i) => {
            return stat + raceData.stat_adj[i];
        });
        const [ modStr, modInt, modWis, modDex, modCon, modCha ] = modStats;
        const eligableClasses = raceData.class_options.filter(cLass => {
            const classes = cLass.split('/');
            let eligable = true;
            for (let i = 0; i < classes.length; i++) {
                this.props.characterData.classes.forEach(cLAss => {
                    if (cLAss.class_name === classes[i]) {
                        classes[i] = cLAss;
                    }
                });
            };
            classes.forEach(cLAss => {
                const { min_stats, alignment_restriction } = cLAss;
                const [ minStr, minInt, minWis, minDex, minCon, minCha ] = min_stats;
                if (
                    minStr <= modStr &&
                    minInt <= modInt &&
                    minWis <= modWis &&
                    minDex <= modDex &&
                    minCon <= modCon &&
                    minCha <= modCha &&
                    alignment_restriction.includes(alignment)
                ) {} else eligable = false;

            });
            if (eligable) {
                return cLass
            }
        });
        const classOptions = eligableClasses.map(cLass => {
            return (
                <option value={cLass}>
                    {cLass}
                </option>
            );
        });

        return (
            <div>
                <select name="cLass" value={this.props.characterCreation.cLass} onChange={this.handleInput}>
                    <option value="">--Choose your class--</option>
                    {classOptions}
                </select>
                <Link to={`/landing/campaign/${campaign_id}/${name}/create/2`}>
                    <button
                        onClick={this.props.rerenderCreation}>
                            Prev Step
                    </button>
                </Link>
                <Link to={`/landing/campaign/${campaign_id}/${name}/create/4`}>
                    <button
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

export default connect(mapStateToProps, { handleCreationInput, rerenderCreation })(CharacterCreation3);