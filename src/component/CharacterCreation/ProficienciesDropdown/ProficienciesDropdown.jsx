import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { handleCreationInput } from '../../../ducks/reducer/character_reducer';

class ProficienciesDropdown extends Component {

    handleInput = (event) => {
        const { name, value } = event.target;
        const { index } = this.props;
        const proficiencies = [ ...this.props.characterCreation.proficiencies ]; 
        if (!proficiencies.includes(value)) {
            proficiencies[index] = value;
            this.props.handleCreationInput(name, proficiencies);
        }
    }
    
    render() {

        const weaponOptions = this.props.weapons.map((weapon, index)=> {
            return (
                <option value={weapon} key={index}>{weapon}</option>
            )
        });

        return (
            <div className='alignmentSelect' style={{margin:0}}>
                <select name="proficiencies" onChange={this.handleInput} value={this.props.characterCreation.proficiencies[this.props.index]}>
                    <option value="">--Select a proficiency--</option>
                    {weaponOptions}
                </select>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { rerenderCreation, characterCreation } = state.character;
    return {
        rerenderCreation,
        characterCreation,
    }
}

export default connect(mapStateToProps, { handleCreationInput })(ProficienciesDropdown);