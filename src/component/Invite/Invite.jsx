import React ,{ Component } from 'react';
import axios from 'axios';

class Invite extends Component {
    constructor() {
        super()
        
        this.state = {
            username: '',
            message: '',
        }
    }
    
    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    sendInvite = () => {
        const { username, message } = this.state;
        const { campaign_id } = this.props;
        axios.post('/api/campaign/invite', {username, message, campaign_id})
            .then(res => {
                this.clear();
            }).catch(err => {
                alert(err.response.request.response);
                console.log(`Invite.sendInvite ${err}`);
            })
    }
    
    clear = () => {
        this.setState({username: '', message: ''});
    }

    render() {
        return (
            <div>
                <p>Username:</p>
                <input type="text" value={this.state.username} name="username" onChange={this.handleInput}/>
                <p>Message:</p>
                <textarea row="3" column="20" type="text" value={this.state.message} name="message" onChange={this.handleInput}/>
                <button onClick={this.sendInvite}>Send</button>
                <button onClick={this.clear}>Clear</button>
            </div>
        )
    }
}

export default Invite;