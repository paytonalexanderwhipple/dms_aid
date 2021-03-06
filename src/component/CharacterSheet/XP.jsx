import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { inputCharacterEdits } from  '../../ducks/reducer/character_reducer.js';
class XP extends Component {
    constructor() {
        super()
        
        this.state = {
            revealed: false,
        }
    }

    toggle = () => {
        this.setState({revealed: !this.state.revealed});
    }

    handleInputXP = (event, idArr, xpTotal) => {
        const { value } = event.target;
        let obj = this.props.characterChanges.XP.xp.xp ? this.props.characterChanges.XP.xp : {xp: xpTotal, idArr}
        obj = {...obj}
        if (value.includes('+')) {
            obj.xp += 1;
            if (value.includes('10')) obj.xp += 9;
            if (value.includes('100')) obj.xp += 90;
            if (value.includes('1000')) obj.xp += 900;
            if (value.includes('10000')) obj.xp += 9000;
        } else {
            obj.xp -= 1;
            if (value.includes('10')) obj.xp -= 9;
            if (value.includes('100')) obj.xp -= 90;
            if (value.includes('1000')) obj.xp -= 900;
            if (value.includes('10000')) obj.xp -= 9000;
        }
        if (obj.xp < 0) {
            obj.xp = 0;
        };
        this.props.inputCharacterEdits('XP', 'xp', obj);
    }

    handleInputHP = (event, hdData) => {
        const { index, hd_type } = hdData;
        const { value } = event.target;
        let obj = this.props.characterChanges.XP.hp[index] || {...hdData, hp:0};
        if (value.includes('+') && obj.hp < hd_type) {
            obj.hp += 1;
        } else if (value.includes('-') && obj.hp > 1){
            obj.hp -= 1;
        }
        let arr = [...this.props.characterChanges.XP.hp];
        arr[index] = obj;
        this.props.inputCharacterEdits('XP', 'hp', arr);
    }

    handleInputProficiencies = (event) => {
        const { name, value } = event.target;
        let arr = [...(this.props.characterChanges.abilities.proficiencies || this.props.character.proficiencies)];
        arr[name] = value;
        this.props.inputCharacterEdits('abilities', 'proficiencies', arr);
    }
    
    render() {

        const { classDetails, race, con, proficiencies } = this.props.character;

        let xpTotal = classDetails.reduce((acc, cLass) => {
            return acc + cLass.xp;
        }, 0)
        let classIds = [];
        switch (race) {
            case "Human":
                if (classDetails.length > 1) {
                    classDetails.forEach(cLass => {
                        if (!cLass.og_class) classIds = [cLass.character_class_id];
                    })
                } else {
                    classIds = [classDetails[0].character_class_id];
                }
                break;
            default: 
                classDetails.forEach(cLass => {
                    classIds.push(cLass.character_class_id);
                })
        }
        let xpDisplay = (<div
            className='Container'>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 19, width: 19}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='-10000'>-10k</button>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 17, width: 17}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='-1000'>-1k</button>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 15, width: 15}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='-100'>-1h</button>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 13, width: 13}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='-10'>-10</button>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 11, width: 11}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='-1'>-1</button>
            <h1 className='text Text'>{this.props.characterChanges.XP.xp.xp === 0 ? 0 : this.props.characterChanges.XP.xp.xp || xpTotal}</h1>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 11, width: 11}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='+1'>+1</button>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 13, width: 13}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='+10'>+10</button>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 15, width: 15}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='+100'>+1h</button>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 17, width: 17}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='+1000'>+1k</button>
            <button className='button' id='IncrementButton' style={{display: this.props.edit ? '' : 'none', height: 19, width: 19}} onClick={event => this.handleInputXP(event, classIds, xpTotal)} value='+10000'>+10k</button>
        </div>);

        let HD = [];
        let index = 0;

        classDetails.forEach(cLass => {
            let hd = cLass.hd - cLass.hp.length;
            for (let i = 0; i < hd; i++) {
                HD.push({class_name: cLass.class_name, hd_type: cLass.hd_type, character_class_id: cLass.character_class_id, index})
                index++
            }
        });

        let newHD = HD.map(hd => {
            const { index, class_name, hd_type } = hd
            return (
                <div
                    style={{display: this.props.edit ? '' : 'none'}}>
                    <h1 className='Text text'>{class_name}: 1-{hd_type}</h1>
                    <div
                        className='Container'>
                        <button className='button' id='IncrementButton' value='-' onClick={event => this.handleInputHP(event, hd)}>-</button>
                        <h1 className='text Text'>{(this.props.characterChanges.XP.hp[index] || {}).hp || 0}</h1>
                        <button className='button' id='IncrementButton' value='+' onClick={event => this.handleInputHP(event, hd)}>+</button>
                    </div>
                </div>
            )
        })

        let Hd = [];

        classDetails.forEach(cLass => {
            for (let i = 0; i < cLass.hp.length; i++) {
                if (cLass.hp[i] !== 0 && i < cLass.level) {
                    Hd.push({class_name: cLass.class_name, hp: cLass.hp[i]});
                }
            }
        })

        let oldHD = Hd.map(hd => {
            const { class_name, hp } = hd
            return (
                <div
                    className='Container text Text'>
                    <h1>{class_name}: {hp}</h1>
                </div>
            )
        })

        let weapons = []; 
        switch(race) {
            case "Dwarf":
                if (classDetails.length > 1) {
                    const count = [];
                    classDetails.forEach(cLass => {
                        count.push(cLass.weapons.length);
                    });
                    const lowestCount = Math.min(count);
                    classDetails.forEach(cLass => {
                        if (cLass.weapons.length === lowestCount) {
                            weapons = lowestCount
                        }
                    })
                } else {
                    weapons = classDetails[0].weapons
                }
                break;
            case "Elf":
            case "Gnome":
            case "Half-Elf":
            case "Halfling":
            case "Half-Orc":
            case "Human":
                if (classDetails.length > 1) {
                    classDetails.forEach(cLass => {
                        cLass.weapons.forEach(weapon => {
                            if (!weapons.includes(weapon)) {
                                weapons.push(weapon);
                            }
                        })
                    })
                } else {
                    weapons = classDetails[0].weapons
                };
                break;
        }
        let weaponOptions = weapons.map(weapon => {
            if (!proficiencies.includes(weapon)) {
                return (
                    <option value={weapon}>{weapon}</option>
                )
            }
        })

        let deficientProficiencies = classDetails.reduce((acc, cLass) => {
            return acc + cLass.proficiencies;
        }, -proficiencies.length);

        let proficiencySelects = [];
        for (let i = 0; i < deficientProficiencies; i++) {
            proficiencySelects.push((
                <div
                    className='alignmentSelect' style={{width: 160, marginTop: 5}}>
                    <select name={i + proficiencies.length} value={(this.props.characterChanges.abilities.proficiencies || [])[i + proficiencies.length]} onChange={this.handleInputProficiencies}>
                        <option value="">--Choose a proficiency--</option>
                        {weaponOptions}
                    </select>
                </div>
            ));
        };

        let oldProficiencies = proficiencies.map(weapon => {
            if (weapon) {
                return (
                    <p className='Text text'>-{weapon}</p>
                );
            };
        })

        let render;
        if (this.state.revealed) {
            render = (<div>
                <div className='SectionTitleBox'>
                    <h1 className='SectionTitle text'>XP:</h1>
                    <button className='button' id='SectionButton' onClick={this.toggle}>v</button>
                </div>
                <hr/>
                <div
                    className='Container'>
                    <h1 className='Header text'>XP:</h1> 
                    {xpDisplay}
                </div>
                <h1
                    className='Header text'
                    style={{display: (this.props.edit && HD.length > 0) || this.props.advanced ? '' : 'none'}}>Hit Dice:</h1>
                <div
                    style={{display: HD.length > 0 && this.props.edit ? '' : 'none'}}>
                    {newHD}
                </div>
                <div
                    style={{display: this.props.advanced ? '' : 'none'}}>
                    <p className='text Text'>{race !== "Human" && classDetails.length > 1 ? `Divided by ${classDetails.length} for multiclass` : ''}</p>
                    <h1 className='text Text'>Constitution: {con.hp > 0 ? '+' : ''}{con.hp}/Hit Die</h1>
                    {oldHD}
                </div>
                <h1
                    className='Header text'
                    style={{display: (this.props.edit && deficientProficiencies > 0) || this.props.advanced ? '' : 'none'}}>Proficiencies:</h1>
                <div
                    style={{display: this.props.edit ? '' : 'none'}}>
                    {proficiencySelects}
                </div>
                <div
                    style={{display: this.props.advanced ? '' : 'none'}}>
                    {oldProficiencies}
                </div>
            </div>
            )    
        } else {
            render = (<div>
                <div className='SectionTitleBox'>
                    <h1 className='SectionTitle text'>XP:</h1>
                    <button className='button' id='SectionButton' onClick={this.toggle}>></button>
                </div>
            </div>
            )
        }

        return (
            <div>
                {render}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { characterChanges } = state.character;
    return {
        characterChanges,
    }
}

export default connect(mapStateToProps, { inputCharacterEdits })(XP);