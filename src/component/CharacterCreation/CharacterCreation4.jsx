import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
    import { handleCreationInput, rerenderCreation, clearClassData, submitCharacter } from '../../ducks/reducer/character_reducer.js';
import ProficienciesDropdown from './ProficienciesDropdown/ProficienciesDropdown.jsx';
import './CharacterCreation4.css';

class CharacterCreation4 extends Component {
    constructor() {
        super()
        
        this.state = {
            advance: false,
            exeptionalStrength: false,
        }
    }

    componentDidMount = () => {
        const { proficiencies, startingGold, str, cLass } = this.props.characterCreation
        if (proficiencies && startingGold && !this.state.advance) {
            this.setState({advance: true});
        } 
        if (str === 18 && !this.state.exeptionalStrength && /Fighter/gi.test(cLass) || /Ranger/gi.test(cLass) || /Paladin/gi.test(cLass)) {
            this.setState({exeptionalStrength: true});
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        let exeptionalStrength = this.props.characterCreation[name] || 0;
        if (value.includes('+')) {
            exeptionalStrength += 1
            if(value.includes('*5')) {
                exeptionalStrength += 4;
            }
        } else {
            exeptionalStrength -= 1
            if (value.includes('*5')) {
                exeptionalStrength -= 4;
            }
        }
        if ( 1 <= exeptionalStrength && exeptionalStrength <= 100 ) {
            this.props.handleCreationInput(name, exeptionalStrength);
        }
    }

    handleGoldInput = (event) => {
        const { name, value } = event.target;
        let range = name.match(/\d+/gi);
        let gp = this.props.characterCreation.startingGold || +range[0];
        if (value === '+') {
            gp += 10
        } else {
            gp -= 10
        }
        if ( +range[0] <= gp && gp <= +range[1] ) {
            this.props.handleCreationInput('startingGold', gp);
        }
    }

    handleButtonInput = (event, hd_type) => {
        const { name, value } = event.target;
        let hp = this.props.characterCreation[name] || 0;
        if (value.includes('+')) {
            hp += 1;
        } else {
            hp -= 1;
        }
        if ( 1 <= hp && hp <= hd_type ) {
            this.props.handleCreationInput(name, hp);
        }
    }

    clearClassData = () => {
        this.props.clearClassData();
        this.props.rerenderCreation();
    }

    componentDidUpdate = () => {
        const { proficiencies, startingGold } = this.props.characterCreation
        if (proficiencies && startingGold && !this.state.advance) {
            this.setState({advance: true});
        }
    }
    
    render() {

        const { campaign_id, name } = this.props.currentCampaign.campaignDetails;

        const characterClasses = this.props.characterCreation.cLass.split('/');
        
        let { classes } = this.props.characterData;
        const { race, str } = this.props.characterCreation;
        let numOfProficiencies = 0;

        classes = characterClasses.map((className, i) => {
            const cLass = classes.filter(classData => {
                return classData.class_name === className;
            })[0];
            numOfProficiencies += cLass.proficiencies;
            return cLass;
        });
        
        let weapons = []; 
        switch(race) {
            case "Dwarf":
                if (classes.length > 1) {
                    const count = [];
                    classes.forEach(cLass => {
                        count.push(cLass.weapons.length);
                    });
                    const lowestCount = Math.min(count);
                    classes.forEach(cLass => {
                        if (cLass.weapons.length === lowestCount) {
                            weapons = lowestCount
                        }
                    })
                } else {
                    weapons = classes[0].weapons
                }
                break;
            case "Elf":
            case "Gnome":
            case "Half-Elf":
            case "Halfling":
            case "Half-Orc":
            case "Human":
                if (classes.length > 1) {
                    classes.forEach(cLass => {
                        cLass.weapons.forEach(weapon => {
                            if (!weapons.includes(weapon)) {
                                weapons.push(weapon);
                            }
                        })
                    })
                } else {
                    weapons = classes[0].weapons
                };
                break;
        }

        const proficiencies = [];

        for (let i = 0; i < numOfProficiencies; i++) {
            proficiencies.push(
                <ProficienciesDropdown weapons={weapons} index={i}/>
            )
        }

        let startingGoldRange = '';

        if (characterClasses.includes("Fighter") || characterClasses.includes("Paladin") || characterClasses.includes("Ranger")) {
            startingGoldRange = "50-200 (5d4)";
        } else if (characterClasses.includes("Cleric") || characterClasses.includes("Druid")) {
            startingGoldRange = "30-180 (3d6)";
        } else if (characterClasses.includes("Assassin") || characterClasses.includes("Thief")) {
            startingGoldRange = "20-120 (2d6)";
        } else if (characterClasses.includes("Illusionist") || characterClasses.includes("Magic-User")) {
            startingGoldRange = "20-80 (2d4)";
        }
        
        const hd = classes.map((cLass, i) => {
            if (cLass.hd > 1) {
                return (
                    <div key={i}>
                        <h1 className='text Header'>{cLass.class_name} hp: 1-{cLass.hd_type}</h1>
                        <div className='IncrementButtonBox'>
                            <button className='button' id='IncrementButton' onClick={(event) => this.handleButtonInput(event, cLass.hd_type)} name={`${cLass.class_name}hp1`} value="-">-</button>
                            <p className='InlineText text'>{this.props.characterCreation[`${cLass.class_name}hp1`] || 0}</p>
                            <button className='button' id='IncrementButton' onClick={(event) => this.handleButtonInput(event, cLass.hd_type)} name={`${cLass.class_name}hp1`} value="+">+</button>
                        </div>
                        <div className='IncrementButtonBox'>
                            <button className='button' id='IncrementButton' onClick={(event) => this.handleButtonInput(event, cLass.hd_type)} name={`${cLass.class_name}hp2`} value="-">-</button>
                            <p className='InlineText text'>{this.props.characterCreation[`${cLass.class_name}hp2`] || 0}</p>
                            <button className='button' id='IncrementButton' onClick={(event) => this.handleButtonInput(event, cLass.hd_type)} name={`${cLass.class_name}hp2`} value="+">+</button>
                        </div>
                        <div style={{display: this.state.exeptionalStrength
                            ? ''
                            : 'none'
                            }}>
                            <h1 className='text Header'>Exeptional Strength</h1>
                            <div className='IncrementButtonBox Container'>
                                <button className='button' id='IncrementButton' onClick={this.handleInput} name='exeptionalStrength' style={{height: 13, width: 13}} value='-*5'>-5</button>
                                <button className='button' id='IncrementButton' onClick={this.handleInput} name='exeptionalStrength' value='-'>-</button>
                                <p className='InlineText text'>{this.props.characterCreation.exeptionalStrength || 0}</p>
                                <button className='button' id='IncrementButton' onClick={this.handleInput} name='exeptionalStrength' value='+'>+</button>
                                <button className='button' id='IncrementButton' onClick={this.handleInput} name='exeptionalStrength' style={{height: 13, width: 13}} value='+*5'>+5</button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={i}>
                        <h1 className='text Header'>{cLass.class_name} hp: 1-{cLass.hd_type}</h1>
                        <div className='IncrementButtonBox'>
                            <button className='button' id='IncrementButton' onClick={(event) => this.handleButtonInput(event, cLass.hd_type)} name={`${cLass.class_name}hp`} value="-">-</button>
                            <p className='InlineText text'>{this.props.characterCreation[`${cLass.class_name}hp`] || 0}</p>
                            <button className='button' id='IncrementButton' onClick={(event) => this.handleButtonInput(event, cLass.hd_type)} name={`${cLass.class_name}hp`} value="+">+</button>
                        </div>
                        <div style={{display: this.state.exeptionalStrength
                            ? ''
                            : 'none'
                            }}>
                            <h1 className='text Header'>Exeptional Strength</h1>
                            <div className='IncrementButtonBox Container'>
                                <button className='button' id='IncrementButton' onClick={this.handleInput} name='exeptionalStrength' style={{height: 13, width: 13}} value='-*5'>-5</button>
                                <button className='button' id='IncrementButton' onClick={this.handleInput} name='exeptionalStrength' value='-'>-</button>
                                <p className='InlineText text'>{this.props.characterCreation.exeptionalStrength || 0}</p>
                                <button className='button' id='IncrementButton' onClick={this.handleInput} name='exeptionalStrength' value='+'>+</button>
                                <button className='button' id='IncrementButton' onClick={this.handleInput} name='exeptionalStrength' style={{height: 13, width: 13}} value='+*5'>+5</button>
                            </div>
                        </div>
                    </div>
                )
            }
        })

        return (
            <div className='Ch4'>
                {proficiencies}
                <h1 className='text Header'>Starting Gold: {startingGoldRange}</h1>
                <div className='IncrementButtonBox'>
                    <button name={startingGoldRange} className='button' id='IncrementButton' onClick={this.handleGoldInput} value='-'>-</button>
                    <p className='InlineText text'>{this.props.characterCreation.startingGold || startingGoldRange.match(/\d+/)[0]}</p>
                    <button name={startingGoldRange} className='button' id='IncrementButton' onClick={this.handleGoldInput} value='+'>+</button>
                </div>
                {hd}
                <Link to={`/landing/campaign/${campaign_id}/${name}/create/3`}>
                    <button
                        className='button'
                        id='prevStepCh4'
                        onClick={this.clearClassData}>
                            Prev Step
                    </button>
                </Link>
                <Link to={`/landing/campaign/${campaign_id}/${name}`}>
                    <button
                        className='button'
                        id='nextStepCh4'
                        style={{display: this.state.advance
                            ? ''
                            : 'none'
                        }}
                        onClick={() => {
                            this.props.submitCharacter(this.props.characterCreation, this.props.currentCampaign.campaignDetails.campaign_id)}
                        }>
                            Submit
                        </button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { characterCreation, rerenderCreation, characterData } = state.character;
    const { currentCampaign } = state.campaign
    return { 
        characterCreation,
        rerenderCreation,
        characterData,
        currentCampaign,
    }
}

export default connect(mapStateToProps, { handleCreationInput, rerenderCreation, clearClassData, submitCharacter })(CharacterCreation4);