import React from 'react';
import { Link } from 'react-router-dom';

function CharacterBlock(props) {
    const classes = props.character.classDetails.map((cLass, i) => {
        return (
            <h2 key={i}>Level {cLass.level} {cLass.class_name}</h2>
        )
    });
    const { name, stats, hp, savingThrows, race } = props.character;
    if (stats[0] > 19) {
        stats[0] = 18
    };
    return (
    <div className='characterSheetRevealed Box'>
        <Link to={`/landing/campaign/${props.campaign_id}/${props.campaign_name}/sheet/${props.character.character_id}`}>
            <button onClick={(event) => props.toggle(event, props.character.character_id)} name='characterSheetRevealed'>👁️</button>
        </Link>
        <h1>{name}</h1>
        <p>{race}</p>
        {classes}
        <p>HP: {hp}</p>
        <span>
            <h1>STR <p>{stats[0]} {stats[6] ? `${stats[6]}%` : ''}</p></h1>
            <h1>INT <p>{stats[1]}</p></h1>
            <h1>WIS <p>{stats[2]}</p></h1>
            <h1>DEX <p>{stats[3]}</p></h1>
            <h1>CON <p>{stats[4]}</p></h1>
            <h1>CHA <p>{stats[5]}</p></h1>
        </span>
        <span>
            <p>Rod, Staff, or Wand</p><p>{savingThrows[0]}</p>
            <p>Breath Weapons</p><p>{savingThrows[1]}</p>
            <p>Death, Paralysis, Poison</p><p>{savingThrows[2]}</p>
            <p>Petrification, Polymorph</p><p>{savingThrows[3]}</p>
            <p>Spells</p><p>{savingThrows[4]}</p>
        </span>
    </div>
    )
}


export default CharacterBlock;