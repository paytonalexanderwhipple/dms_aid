import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { inputCharacterEdits } from '../../ducks/reducer/character_reducer.js';

class Abilites extends Component {
    constructor() {
        super()
        
        this.state = {
            
        }
    }

    handleInputPersonal = (event) => {
        const { name, value } = event.target;
        this.props.inputCharacterEdits('personalDetails', name, value);
    }

    handleInputAbilities = (event) => {
        const { name, value } = event.target;
        this.props.inputCharacterEdits('abilities', name, value);
    }

    handleInputStats = (event) => {
        const { name, value } = event.target;
        let stat = this.props.characterChanges.abilities[name] || this.props.character.stats[value.match(/\d/g)[0]];
        if (value.includes('+')) {
            stat += 1
        } else {
            stat -= 1
        }
        if ( 3 <= stat && stat <= 19 && name !== 'exeptionalStrength') {
            this.props.inputCharacterEdits('abilities', name, stat);
        }
        if ( name === 'exeptionalStrength' && 1 <= stat && stat <= 100 ) {
            this.props.inputCharacterEdits('abilities', name, stat);
        }
        console.log(stat);
    }
    
    render() {

        const { name, stats, str, int, wis, dex, con, cha } = this.props.character;

        const { is_dm } = this.props.currentCampaign.campaignDetails;

        return (
            <div>
                <h1>Name:</h1>
                {this.props.edit 
                    ? <input onChange={this.handleInput} value={this.props.characterChanges.personalDetails.name} name="name" placeholder={name}/>
                    : <p>{name}</p>
                }
                <h1>STR 
                    {this.props.edit && is_dm
                        ? (
                            <div>
                                {this.props.characterChanges.abilities.str || stats[0]}
                                <button onClick={this.handleInputStats} name='str' value='-0'>-</button>
                                <button onClick={this.handleInputStats} name='str' value='+0'>+</button>
                            </div>
                        )
                        : stats[0]
                    } 
                    {stats[0] === 18 
                        ? this.props.edit && is_dm
                            ? (
                                <div>
                                    {this.props.characterChanges.abilities.exeptionalStrength || stats[6]}
                                    <button onClick={this.handleInputStats} name='exeptionalStrength' value='-6'>-</button>
                                    <button onClick={this.handleInputStats} name='exeptionalStrength' value='+6'>+</button>
                                </div>
                            )
                            : (
                                <p>
                                    {stats[6]}%
                                </p>
                            )
                        : ''}
                </h1>
                <h1>INT {this.props.edit && is_dm
                        ? (
                            <div>
                                {this.props.characterChanges.abilities.int || stats[1]}
                                <button onClick={this.handleInputStats} name='int' value='-1'>-</button>
                                <button onClick={this.handleInputStats} name='int' value='+1'>+</button>
                            </div>
                        )
                        : stats[1]
                    }</h1>
                <h1>WIS {this.props.edit && is_dm
                        ? (
                            <div>
                                {this.props.characterChanges.abilities.wis || stats[2]}
                                <button onClick={this.handleInputStats} name='wis' value='-2'>-</button>
                                <button onClick={this.handleInputStats} name='wis' value='+2'>+</button>
                            </div>
                        )
                        : stats[2]
                    }</h1>
                <h1>DEX {this.props.edit && is_dm
                        ? (
                            <div>
                                {this.props.characterChanges.abilities.dex || stats[3]}
                                <button onClick={this.handleInputStats} name='dex' value='-3'>-</button>
                                <button onClick={this.handleInputStats} name='dex' value='+3'>+</button>
                            </div>
                        )
                        : stats[3]}</h1>
                <h1>CON {this.props.edit && is_dm
                        ? (
                            <div>
                                {this.props.characterChanges.abilities.con || stats[4]}
                                <button onClick={this.handleInputStats} name='con' value='-4'>-</button>
                                <button onClick={this.handleInputStats} name='con' value='+4'>+</button>
                            </div>
                        )
                        : stats[4]}</h1>
                <h1>CHA {this.props.edit && is_dm
                        ? (
                            <div>
                                {this.props.characterChanges.abilities.cha || stats[5]}
                                <button onClick={this.handleInputStats} name='cha' value='-5'>-</button>
                                <button onClick={this.handleInputStats} name='cha' value='+5'>+</button>
                            </div>
                        )
                        : stats[5]}</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { characterChanges } = state.character;
    const { currentCampaign } = state.campaign;
    return {
        characterChanges,
        currentCampaign,
    }
}

export default connect(mapStateToProps, { inputCharacterEdits })(Abilites);