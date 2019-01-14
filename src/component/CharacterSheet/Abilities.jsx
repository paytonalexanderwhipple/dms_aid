import React ,{ Component } from 'react';
import { connect } from 'react-redux';
    import { inputCharacterEdits } from '../../ducks/reducer/character_reducer.js';


class Abilites extends Component {
    constructor(props) {
        super(props)
        
        this.textarea = React.createRef();

        this.state = {
            languageInput: '',
            textSelectionStart: '',
            tab: false,
            revealed: false,
        }
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    handleInputPersonal = (event) => {
        const { name, value } = event.target;
        this.props.inputCharacterEdits('personalDetails', name, value);
    }

    handleInputAbilities = (event) => {
        const { name, value } = event.target;
        this.props.inputCharacterEdits('abilities', name, value);
    }

    handleClassInput = (event) => {
        const { name, value } = event.target;
        this.props.inputCharacterEdits('dualClass', name, value);
    }

    handleTab = (event) => {
        let { value, name, selectionStart } = event.target;
        if (event.keyCode === 9) {
            event.preventDefault();
            value = value.slice(0, selectionStart) + '\t' + value.slice(selectionStart, );
            this.setState({textSelectionStart: selectionStart, tab: true})
            this.props.inputCharacterEdits('abilities', name, value);
        }
    }
    
    componentDidUpdate = (prevProps) => {
        if (this.props.characterChanges.abilities.special_abilities !== prevProps.characterChanges.abilities.special_abilities && this.state.tab) {
            this.textarea.current.selectionStart = this.state.textSelectionStart + 1;
            this.textarea.current.selectionEnd = this.state.textSelectionStart + 1;
            this.setState({tab: false});
        }
    }

    handleInputStats = (event) => {
        const { name, value } = event.target;
        let stat = this.props.characterChanges.abilities[name] || this.props.character.stats[value.match(/\d/g)[0]];
        if (value.includes('+')) {
            if (value.includes('*5')) {
                stat += 4
            }
            stat += 1
        } else {
            if (value.includes('*5')) {
                stat -= 4
            }
            stat -= 1
        }
        if ( 3 <= stat && stat <= 19 && name !== 'exeptionalStrength') {
            this.props.inputCharacterEdits('abilities', name, stat);
        }
        if ( name === 'exeptionalStrength' && 1 <= stat && stat <= 100 ) {
            this.props.inputCharacterEdits('abilities', name, stat);
        }
    }

    removeLanguage = (index) => {
        let languages = [ ...this.props.character.languages ];
        languages = languages.splice(1, index);
        this.props.inputCharacterEdits('abilities', 'languages', languages);
    }

    addLanguage = () => {
        let languages = this.props.characterChanges.abilities.languages || this.props.character.languages;
        languages = [ ...languages ];
        if (this.state.languageInput) {
            languages.push(this.state.languageInput);
            this.props.inputCharacterEdits('abilities', 'languages', languages);
            this.setState({languageInput: ''});
        };
    }

    toggle = (event) => {
        const { name } = event.target;
        this.setState({[name]: !this.state[name]});
    }
    
    render() {

        const { name, alignment, thief_adj, stats, str, int, wis, dex, con, cha, detections, base_movement, vision, hp, racial_languages, race, classDetails, title, armorDetails } = this.props.character;
        const { toHit, damage, encumbranceAdj, minorTest, minorTestEx, majorTest } = str;
        const { addLanguages, chanceToUnderstand, minSpells, maxSpells } = int;
        const { mental, spells, failure } = wis;
        let bonusSpells = spells.map((num, i) => {
            let superScript = '';
            switch(i) {
                case 0:
                superScript = '1st';
                break;
                case 1:
                superScript = '2nd';
                break;
                case 2:
                superScript = '3rd';
                break;
                case 3:
                superScript = '4th';
                break;
            }
            return (<p>{num}<sup className="sup">{superScript}</sup></p>);
        })
        const { suprise, missile, ac } = dex;
        const { raise, shock } = con;
        const { henchmen, loyalty, reaction } = cha;
        let classes = classDetails.map(cLass => {
            return cLass.class_name;
        })

        let classThiefSkills = classDetails.reduce((acc, cLass) => {
            if (acc.thief_skills[2] >= cLass.thief_skills[2]) {
                return acc
            } else {
                return cLass
            }
        }, {thief_skills: [0, 0, 0, 0, 0, 0, 0, 0]})

        let concatThiefSkills = classThiefSkills.thief_skills.map((skill, i) => {
            return skill + dex.thief_adj[i] + thief_adj[i];
        })

        let thiefSkills = concatThiefSkills.map((skill, i) => {
            switch(i) {
                case 0:
                    return <p className='text Text' style={{marginLeft: 5}}>Climb Walls: {skill}%</p>
                case 1:
                    return <p className='text Text' style={{marginLeft: 5}}>Find Traps: {skill}%</p>
                case 2:
                    return <p className='text Text' style={{marginLeft: 5}}>Hear Noise: {skill}%</p>
                case 3:
                    return <p className='text Text' style={{marginLeft: 5}}>Hide In Shadows: {skill}%</p>
                case 4:
                    return <p className='text Text' style={{marginLeft: 5}}>Move Quietly: {skill}%</p>
                case 5:
                    return <p className='text Text' style={{marginLeft: 5}}>Open Locks: {skill}%</p>
                case 6:
                    return <p className='text Text' style={{marginLeft: 5}}>Pick Pockets: {skill}%</p>
                case 7:
                    return <p className='text Text' style={{marginLeft: 5}}>Read Languages: {skill}%</p>
            }
        })

        let { languages, special_abilities } = this.props.character;
        const { is_dm } = this.props.currentCampaign.campaignDetails;

        let detectionsList = detections.split('&').map((text, i) => {
            if (text) {
                return (
                    <p className='Text text' key={i}>-{text}</p>
                )
            }
        })

        const racialLanguagesList = racial_languages.map(language => {
            return (
                <p className='Text text'>-{language}</p>
            )
        })

        languages = this.props.characterChanges.abilities.languages || languages

        const languagesList = languages.map((language, i) => {
            return (
                <div className='Container'>
                    <p className='Text text'>-{language}</p>
                    <button
                        style={{display: this.props.edit && is_dm
                            ? ''
                            : 'none',
                            paddingBottom: 1
                        }}
                        className='button'
                        id='IncrementButtonX'
                        onClick={(event) => this.removeLanguage(i)}>
                        x
                    </button>
                </div>
            )
        })

        let specialAbilitiesList = classDetails.reduce((acc, cLass) => {
            return acc.concat(cLass.special_abilities.split('&'))
        }, [])
        let specialAbilities = specialAbilitiesList.map(ability => {
            if (ability) {
                return (
                    <div>
                        <h1>-{ability}</h1>
                    </div>
                )
            }
        })

        let additionalLanguages = 0;
        switch(race) {
            case "Dwarf":
            case "Half-Orc":
            case "Gnome":
                additionalLanguages = Math.min(2, addLanguages);
                break;
            case "Elf":
                switch(stats[1]) {
                    case 16:
                        additionalLanguages = 1;
                        break;
                    case 17:
                        additionalLanguages = 2;
                        break;
                    case 18:
                        additionalLanguages = 3;
                        break;
                    case 19:
                        additionalLanguages = 4;
                        break;
                    default:
                        additionalLanguages = 0;
                }
                break;
            case "Half-Elf":
            case "Human":
                additionalLanguages = addLanguages;
                break;
            case "Halfling":
                switch(stats[1]) {
                    case 17:
                        additionalLanguages = 1;
                        break;
                    case 18:
                        additionalLanguages = 2;
                        break;
                    default:
                        additionalLanguages = 0;
                        break;
                }
        }

        let dualClass = true;

        let classSelectionList = this.props.characterData.classes.filter(cLass => {
            let editStats = [];
            for (let key in this.props.characterChanges.abilities) {
                if (this.props.characterChanges.abilities[key]) {
                    switch (key) {
                        case 'str':
                            editStats[0] = this.props.characterChanges.abilities[key];
                            break;
                        case 'int':
                            editStats[1] = this.props.characterChanges.abilities[key];
                            break;
                        case 'wis':
                            editStats[2] = this.props.characterChanges.abilities[key];
                            break;
                        case 'dex':
                            editStats[3] = this.props.characterChanges.abilities[key];
                            break;
                        case 'con':
                            editStats[4] = this.props.characterChanges.abilities[key];
                            break;
                        case 'cha':
                            editStats[5] = this.props.characterChanges.abilities[key];
                            break;
                        case 'exeptionalStrength':
                            editStats[6] = this.props.characterChanges.abilities[key];
                            break;
                    }
                }
            }
            let newStats = stats.map((stat, i) => {
                if (editStats[i]) return editStats[i]
                else return stat
            });
            let include = true;
            const { min_stats, primary_stat } = cLass;
            if (classes.includes(cLass.class_name)) {
                include = false;
                if (newStats[primary_stat] >= 15) {}
                else dualClass = false;
            }
            for (let i = 0; i < min_stats.length; i++) {
                if (i !== primary_stat) {
                    if (newStats[i] >= min_stats[i]) {}
                    else include = false;
                } else {
                    if (newStats[primary_stat] >= 17) {}
                    else include = false;
                }
            };
            if (!cLass.alignment_restriction.includes(alignment)) {
                include = false;
            }
            return include;
        });

        let classSelection = classSelectionList.map(cLass => {
            return (
                <option value={cLass.class_name}>
                    {cLass.class_name}
                </option>
            )
        })

        let armor;
        let shield;

        armorDetails.forEach(piece => {
            if (piece.name.includes('Shield')) {
                shield = piece;
            } else {
                armor = piece;
            }
        })

        let restricted = `Thief Skills cant be used while wearing ${armor.name}`;
        if (armor.name === 'None' || armor.name === 'Leather' || armor.name === 'Studded' || armor.name === 'Elfin-Chain') {
            restricted = '';
        }

        let BonusSpells = (<div className='Container' style={{marginTop: -2}}>
            <p>{bonusSpells[0]}</p>
            <p>{bonusSpells[1]}</p>
            <p>{bonusSpells[2]}</p>
            <p>{bonusSpells[3]}</p>
        </div>)
        let render;

        if (this.state.revealed) {
            render = (<div className='Abilities'>
                <div className='SectionTitleBox'>
                    <h1 className='SectionTitle text'>Abilities:</h1>
                    <button className='button' id='SectionButton' onClick={this.toggle} name='revealed'>v</button>
                </div>
                <hr/>
                <div className='Container'>
                    <h1 className='text Header'>Name:</h1>
                    {this.props.edit 
                        ? <input className='input' onChange={this.handleInputPersonal} value={this.props.characterChanges.personalDetails.name} name="name"/>
                        : <p className='text Header'>{name}</p>
                    }
                </div>
                <div className='Container'>
                    <h1
                        style={{display: this.props.edit || title
                            ? ''
                            : 'none',
                            marginLeft: 3
                    }}
                    className='text Header'>
                        Title:
                    </h1>
                    <div
                        style={{display: title || this.props.edit
                            ? ''
                            : 'none'
                        }}>
                        {this.props.edit
                            ? <input className='input' onChange={this.handleInputPersonal} value={this.props.characterChanges.personalDetails.title} name="title"/>
                            : <p className='text Header'>{title}</p>
                        }
                    </div>
                </div>
                <div className='Container'>
                    <h1 className='text Header'>Alignment:</h1>
                    {this.props.edit && is_dm
                        ? (
                            <div className='alignmentSelect' style={{margin: 0}}>
                                <select name="alignment" onChange={this.handleInputPersonal} value={this.props.characterChanges.personalDetails.alignment || alignment}>
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
                            </div>
                        )
                        : <p className='text Header'>{alignment}</p>
                    }
                </div>
                <div className='Container'>
                    <h1 className='text Header'>Classes:</h1>
                    <p className='text Header'>{classes.join('/')}</p>
                    <div
                        style={{display: this.props.edit && dualClass && race === "Human" && classDetails.length < 2 && is_dm && classSelectionList[0]
                            ? ''
                            : 'none'
                        }}>
                        <div className='alignmentSelect' style={{margin: 0, width: 160}}>
                            <select onChange={this.handleClassInput} name="class_name" value={this.props.characterChanges.dualClass.class_name}>
                                <option value="">--Choose a dual class--</option>
                                {classSelection}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='statsContainer'>
                    <h1 className='text Header'>STR 
                        {this.props.edit && is_dm
                            ? (
                                <div>
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='str' value='-0'>-</button>
                                    {this.props.characterChanges.abilities.str || stats[0]}
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='str' value='+0'>+</button>
                                </div>
                            )
                            : ` ${stats[0]}`
                        } 
                        {stats[0] === 18 && !this.props.edit && (classes.includes('Fighter') || classes.includes('Paladin') || classes.includes('Ranger'))
                            ? ` (${stats[6]}%)`
                            : (this.props.edit && is_dm && (this.props.characterChanges.abilities.str || stats[0]) === 18 && (classes.includes('Fighter') || classes.includes('Paladin') || classes.includes('Ranger'))
                                ? (
                                    <div className='ContainerInline'>
                                        <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='exeptionalStrength' value='-6*5' style={{height: 13, width: 13}}>-5</button>
                                        <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='exeptionalStrength' value='-6'>-</button>
                                        {this.props.characterChanges.abilities.exeptionalStrength || stats[6]}%
                                        <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='exeptionalStrength' value='+6'>+</button>
                                        <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='exeptionalStrength' value='+6*5' style={{height: 13, width: 13}}>+5</button>                                        
                                    </div>
                                )
                                : '')
                        }
                        <div
                            className='Container'
                            style={{display: !this.props.edit && this.props.advanced
                                ? ''
                                : 'none'
                            }}>
                            <p className='text Smalltext' style={{marginRight: 2, marginTop: -3}}>To Hit: {toHit > 0 ? '+' : ''}{toHit}{' '}</p>
                            <p className='text Smalltext' style={{marginRight: 2, marginTop: -3}}>Damage: {damage > 0 ? '+' : ''}{damage}{' '}</p>
                            <p className='text Smalltext' style={{marginRight: 2, marginTop: -3}}>Encumbrance: {encumbranceAdj > 0 ? '+' : ''}{encumbranceAdj}{' '}</p>
                            <p className='text Smalltext' style={{marginRight: 2, marginTop: -3}}>Minor Test: {minorTest}{minorTestEx ? `(${minorTestEx})` : ''}{' '}</p>    
                            <p className='text Smalltext' style={{marginRight: 2, marginTop: -3}}>Major Test: {majorTest}%</p>
                        </div>
                    </h1>
                    <h1 className='text Header'>INT {this.props.edit && is_dm
                            ? (
                                <div>
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='int' value='-1'>-</button>
                                    {this.props.characterChanges.abilities.int || stats[1]}
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='int' value='+1'>+</button>
                                </div>
                            )
                            : stats[1]
                        }
                        <div
                            style={{display: !this.props.edit && this.props.advanced
                                ? ''
                                : 'none'
                            }}
                            className='Container'>
                            <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>Add Languages: {additionalLanguages}</p>
                            <p 
                                style={{display: classes.includes('Magic-User'), marginRight: 2, marginTop: -3}}
                                className='Smalltext text'>% To Understand Spell: {chanceToUnderstand}</p>
                            <p 
                                style={{display: classes.includes('Magic-User'), marginRight: 2, marginTop: -3}}
                                className='Smalltext text'>Min Spells: {minSpells} Max Spells: {maxSpells}</p>
                        </div>
                    </h1>
                    <h1 className='text Header'>WIS {this.props.edit && is_dm
                            ? (
                                <div>
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='wis' value='-2'>-</button>
                                    {this.props.characterChanges.abilities.wis || stats[2]}
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='wis' value='+2'>+</button>
                                </div>
                            )
                            : stats[2]
                        }
                    </h1>
                    <div
                        style={{display: !this.props.edit && this.props.advanced
                            ? ''
                            : 'none'
                        }}
                        className='Container'>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>Mental Saves Bonus: {mental > 0 ? '+' : ''}{mental}</p>
                        <p
                            style={{display: classes.includes('Cleric') || classes.includes('Druid')
                                ? ''
                                : 'none', marginRight: 2, marginTop: -3}}
                                className='Smalltext text Container'>Bonus Spells: {bonusSpells[0] ? BonusSpells : 'none'}</p>
                        <p
                            style={{display: classes.includes('Cleric') || classes.includes('Druid')
                                ? ''
                                : 'none', marginRight: 2, marginTop: -3}}
                                className='Smalltext text'>Spell Failure: {failure}%</p>
                    </div>
                    <h1 className='text Header'>DEX {this.props.edit && is_dm
                            ? (
                                <div>
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='dex' value='-3'>-</button>
                                    {this.props.characterChanges.abilities.dex || stats[3]}
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='dex' value='+3'>+</button>
                                </div>
                            )
                            : stats[3]
                        }
                    </h1>
                    <div
                        style={{display: !this.props.edit && this.props.advanced
                            ? ''
                            : 'none',
                        }}
                        className='Container'>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>Surprise Bonus/Missile To Hit Adj: {suprise > 0 ? '+' : ''}{suprise}</p>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>AC Adj: {ac > 0 ? '+' : ''}{ac}</p>
                    </div>
                    <h1 className='text Header'>CON {this.props.edit && is_dm
                            ? (
                                <div>
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='con' value='-4'>-</button>
                                    {this.props.characterChanges.abilities.con || stats[4]}
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='con' value='+4'>+</button>
                                </div>
                            )
                            : stats[4]
                        }
                    </h1>
                    <div
                        style={{display: !this.props.edit & this.props.advanced
                            ? ''
                            : 'none'
                        }}
                        className='Container'>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>Resurection Survival: {raise}%</p>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>System Shock Survival: {shock}%</p>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>HP Bonus: {con.hp > 0 ? '+' : ''}{con.hp}</p>
                    </div>
                
                    <h1 className='text Header'>CHA {this.props.edit && is_dm
                            ? (
                                <div>
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='cha' value='-5'>-</button>
                                    {this.props.characterChanges.abilities.cha || stats[5]}
                                    <button className='button' id='IncrementButton' onClick={this.handleInputStats} name='cha' value='+5'>+</button>
                                </div>
                            )
                            : stats[5]
                        }
                    </h1>
                    <div
                        style={{display: !this.props.edit && this.props.advanced
                            ? ''
                            : 'none'
                        }}
                        className='Container'>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>Max Henchmen: {henchmen}</p>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>Loyalty Bonus: {loyalty > 0 ? '+' : ''}{loyalty}%</p>
                        <p className='Smalltext text' style={{marginRight: 2, marginTop: -3}}>Reaction Bonus: {reaction > 0 ? '+' : ''}{reaction}%</p>
                    </div>
                </div>
                <div
                    style={{display: vision
                        ? ''
                        : 'none'
                    }}
                    className='Container'>
                    <h1 className='Header text'>Vision:</h1>
                    <p className='Header text'>{vision}</p>
                </div>
                <div
                    style={{display: detections
                        ? ''
                        : 'none'
                    }}>
                    <h1 className='Header text'>Detections:</h1>
                    {detectionsList}
                </div>
                <div>
                    <h1 className='Header text '>Languages:</h1>
                    {racialLanguagesList}
                    {languagesList}
                    <div
                        style={{display: this.props.edit && is_dm
                            ? ''
                            : 'none'
                        }}>
                        <input className='input' onChange={this.handleInput} name="languageInput" value={this.state.languageInput}/>
                        <button className='button' id='IncrementButton' onClick={this.addLanguage}>+</button>
                        <h1 className='Smalltext text'>Possible Additional Languages: {additionalLanguages}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='Header text'>Class Abilities:</h1>
                    <p className='Text text MultilineDisplay'>{specialAbilities}</p>
                </div>
                <div
                    style={{display: classes.includes('Thief') || classes.includes('Assassin')
                        ? ''
                        : 'none'
                    }}>
                    <h1 className='Header text'>Thief Skills</h1>
                    {thiefSkills}
                    <p className='text Smalltext'>{restricted}</p>
                </div>
                <div
                    style={{display: this.props.edit
                        ? 'none'
                        : ''
                    }}
                    className='Container'>
                    <h1 className='Header text'>Base Movement: {base_movement}'</h1>
                </div>
            </div>)
        } else {
            render = (
                <div>
                    <div className='SectionTitleBox'>
                        <h1 className='SectionTitle text'>Abilities:</h1>
                        <button className='button' id='SectionButton' onClick={this.toggle} name='revealed'>></button>
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
    const { characterChanges, characterData } = state.character;
    const { currentCampaign } = state.campaign;
    return {
        characterChanges,
        characterData,
        currentCampaign,
    }
}

export default connect(mapStateToProps, { inputCharacterEdits })(Abilites);