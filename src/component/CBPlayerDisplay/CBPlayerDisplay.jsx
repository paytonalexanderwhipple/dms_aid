import React from 'react';
import './CBPlayerDisplay.css';

function CBPlayerDisplay(props) {

    let classes = props.character.classDetails.map((classDetails, i) => {
        return <p key={i} className='CBPD-class_name'>-level {classDetails.level} {classDetails.class_name}</p> 
    })

    return (
    <div>
        <p className='text CBplayerName' >Name:{props.character.name}</p>
        <p className='text CBplayerRace' >{props.character.race}</p>
        <p className='text' >{classes}</p>
    </div>
    )
}

export default CBPlayerDisplay;