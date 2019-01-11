import React ,{ Component } from 'react';
import axios from 'axios';
import './InviteBox.css';

class InviteBox extends Component {
    constructor() {
        super()
        
        this.state = {
            invites: [],
        }
    }

    componentDidMount = () => {
        this.getInvites();
    }

    getInvites = () => {
        axios.get('/api/invites')
        .then(res => {
            this.setState({invites: res.data});
        }).catch(err => {
            console.log(`InviteBox.componentDidMount ${err}`);
        });
    }

    acceptInvite = (name, id) => {
        axios.post('/api/invites', { name, id })
            .then(res => {
                this.getInvites();
            }).catch(err => {
                console.log(`Invitebox.acceptInvite ${err}`);
            });
    }
    
    declineInvite = (id) => {
        axios.delete(`/api/requests/${id}`)
            .then(res => {
                this.getInvites();
            }).catch(err => {
                console.log(`InviteBox.declineInvite ${err}`);
            });
    }

    render() {

        let invites = this.state.invites.map((invite, i) => {
            return (
                <div key={i} className='inviteBoxInvite paper'>
                    <h1 className='text IBname'>Campaign:{invite.name}</h1>
                    <p className='MultilineDisplay text IBmessage'>{invite.message}</p>
                    <button id='inviteBoxButton1' className='button' onClick={() => this.acceptInvite(invite.name, invite.join_request_id)}>Accept</button>
                    <button id='inviteBoxButton2' className='button' onClick={() => this.declineInvite(invite.join_request_id)}>Decline</button>
                </div>
            );
        })

        return (
            <div className={this.props.revealed ? 'InviteBox RevealInviteBox' : 'InviteBox'}>
                <div className='InviteBoxBox'>
                    {invites}
                </div>
                <div className='IBbuttonBox'>
                    <button className='button' id='IBcancel' onClick={this.props.toggleInvite}>Cancel</button>
                </div>
            </div>
        )
    }
}

export default InviteBox;