import React ,{ Component } from 'react';

class PersonalDetails extends Component {

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }
    
    render() {
        return (
            <div>
            </div>
        )
    }
}

export default PersonalDetails;