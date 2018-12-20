import React ,{ Component } from 'react';
import CBPlayerDisplay from '../CBPlayerDisplay/CBPlayerDisplay.jsx';

class CampaignBlock extends Component {
    constructor() {
        super()
        
        this.state = {
            
        }
    }
    
    render() {

        let roster = this.props.campaign.characters.map((character, i) => {
            return (
                <CBPlayerDisplay character={character} key={i}/>
            )
        })

        const { img, name, description, class_restrictions, level_limits } = this.props.campaign; 

        return (
            <div className='CampaignBlock'>
                <img src={img} alt=""/>
                <p className='CB-name'>{name}</p>
                <p className='CB-description'>{description}</p>
                {roster}
                <p className='CB-class_restrictions'>{class_restrictions}</p>
                <p className='CB-level_limits'>{level_limits}</p>
            </div>
        )
    }
}

export default CampaignBlock;