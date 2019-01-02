import React ,{ Component } from 'react';

class Message extends Component {
    constructor() {
        super()
        
        this.state = {
            
        }
    }
    
    render() {
        return (
            <div>
                Messages
                <button onClick={this.props.handleView} name="landing">Home</button>
            </div>
        )
    }
}

export default Message;