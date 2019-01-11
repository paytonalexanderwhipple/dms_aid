import React ,{ Component } from 'react';
import axios from 'axios';
import './Invite.css';

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
        this.setState({username: '', message: '', invite: false});
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

    toggle = () => {
        this.setState({invite: !this.state.input});
    }

    render() {

        let render;

        if (this.state.invite) {
            render = (<div className='InviteButtonBox'>
                <input id='InviteInput' className='input' placeholder='Username' type="text" value={this.state.username} name="username" onChange={this.handleInput}/>
                <div>
                    <p className='text InviteText'>Message:</p>
                    <textarea maxLength='50' className='textarea paper' row="3" column="20" type="text" ref={this.textarea} onKeyDown={this.handleTab} value={this.state.message} name="message" onChange={this.handleInput}/>
                </div>
                <div>
                    <button id='InviteButton' className='button' onClick={this.sendInvite}>Send</button>
                    <button id='InviteButton' className='button' onClick={this.clear}>Cancel</button>
                </div>
            </div>
            )
        } else {
            render = (<div className='InviteButtonBox'>
                <button className='button paper' onClick={this.toggle}>Invite Players</button>
            </div>)
        }

        return (
            <div>
                {render}
            </div>
        )
    }
}

export default Invite;