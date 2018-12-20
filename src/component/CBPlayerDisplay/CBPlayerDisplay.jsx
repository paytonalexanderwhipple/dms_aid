import React from 'react'

function CBPlayerDisplay(props) {

    let classes = props.character.classDetails.map((classDetails, i) => {
        return <p key={i} className='CBPD-class_name'>level{classDetails.level}{classDetails.class_name}</p> 
    })

    return (
    <div>
        {props.character.name}
        {props.character.race}
        {classes}
    </div>
    )
}

export default CBPlayerDisplay;