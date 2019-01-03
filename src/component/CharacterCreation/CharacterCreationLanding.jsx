import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
    import { handleCreationInput, rerenderCreation } from '../../ducks/reducer/character_reducer.js';


class CharacterCreationLanding extends Component {
    constructor() {
        super()
        
        this.state = {
            advance: false,
        }
    }

    componentDidMount = () => {
        const { name, alignment } = this.props.characterCreation
        if (name && alignment && !this.state.advance) {
            this.setState({advance: true});
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.props.handleCreationInput(name, value);
    }

    componentDidUpdate = () => {
        const { name, alignment } = this.props.characterCreation
        if (name && alignment && !this.state.advance) {
            this.setState({advance: true});
        }
    }
    
    render() {

        const { campaign_id, name } = this.props.currentCampaign.campaignDetails

        return (
            <div>
                <h1>Name:</h1>
                <input type="text"
                    onChange={this.handleInput}
                    name='name'
                    value={this.props.characterCreation.name}
                    maxLength="50"/>
                <h1>Alignment:</h1>
                <select name="alignment"
                    onChange={this.handleInput}
                    value={this.props.characterCreation.alignment}>
                    <option value="">--Choose your alignment--</option>
                    <option value="Lawful-Good">Lawful Good</option>
                    <option value="Neutral-Good">Neutral Good</option>
                    <option value="Chaotic-Good">Chaotic Good</option>
                    <option value="Lawful-Neutral">Lawful Neutral</option>
                    <option value="True-Neutral">True Neutral</option>
                    <option value="Chaotic-Neutral">Chaotic Neutral</option>
                    <option value="Lawful-Evil">Lawful Evil</option>
                    <option value="Neutral-Evil">Neutral Evil</option>
                    <option value="Chaotic-Evil">Chaotic Evil</option>
                </select>
                <Link to={`/landing/campaign/${campaign_id}/${name}/create/1`}>
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
    const { characterCreation, rerenderCreation } = state.character;
    const { currentCampaign } = state.campaign
    return { 
        characterCreation,
        currentCampaign,
        rerenderCreation,
    }
}

export default connect(mapStateToProps, { handleCreationInput, rerenderCreation })(CharacterCreationLanding);