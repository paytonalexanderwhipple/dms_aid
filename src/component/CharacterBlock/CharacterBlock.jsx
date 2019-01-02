import React from 'react';

function CharacterBlock(props) {
    const classes = props.character.classDetails.map((cLass, i) => {
        return (
            <h2>Level {cLass.level} {cLass.class_name}</h2>
        )
    });
    const { name, stats, hp, savingThrows } = props.character;
    if (stats[0] > 19) {
        stats[0] = 18
    };
    return (
    <div className='Box'>
        <h1>{name}</h1>
        {classes}
        <p>HP: {hp}</p>
        <span>
            <p>STR <p>{stats[0]} {stats[6] ? `${stats[6]}%` : ''}</p></p>
            <p>INT <p>{stats[1]}</p></p>
            <p>WIS <p>{stats[2]}</p></p>
            <p>DEX <p>{stats[3]}</p></p>
            <p>CON <p>{stats[4]}</p></p>
            <p>CHA <p>{stats[5]}</p></p>
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