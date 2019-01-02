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
                <div key={i}>
                    <h1>{invite.name}</h1>
                    <p>{invite.message}</p>
                    <button onClick={() => this.acceptInvite(invite.name, invite.join_request_id)}>Accept</button>
                    <button onClick={() => this.declineInvite(invite.join_request_id)}>Decline</button>
                </div>
            );
        })

        return (
            <div className={this.props.revealed ? 'InviteBox RevealInviteBox' : 'InviteBox'}>
                <div>
                    {invites}
                </div>
                <button onClick={this.props.toggleInvite}>Cancel</button>
            </div>
        )
    }
}

export default InviteBox;