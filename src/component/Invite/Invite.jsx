import React ,{ Component } from 'react';
import axios from 'axios';

class Invite extends Component {
    constructor() {
        super()

        this.textarea = React.createRef();
        
        this.state = {
            username: '',
            message: '',
            textSelectionStart: '',
            tab: false,
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

    handleTab = (event) => {
        let { value, name, selectionStart } = event.target;
        if (event.keyCode === 9) {
            event.preventDefault();
            value = value.slice(0, selectionStart) + '\t' + value.slice(selectionStart, );
            this.setState({[name]: value, textSelectionStart: selectionStart, tab: true, })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.description !== prevState.description && this.state.tab) {
            this.textarea.current.selectionStart = this.state.textSelectionStart + 1;
            this.textarea.current.selectionEnd = this.state.textSelectionStart + 1;
            this.setState({tab: false});
        }
    }

    render() {
        return (
            <div>
                <p>Username:</p>
                <input type="text" value={this.state.username} name="username" onChange={this.handleInput}/>
                <p>Message:</p>
                <textarea row="3" column="20" type="text" ref={this.textarea} onKeyDown={this.handleTab} value={this.state.message} name="message" onChange={this.handleInput}/>
                <button onClick={this.sendInvite}>Send</button>
                <button onClick={this.clear}>Clear</button>
            </div>
        )
    }
}

export default Invite;