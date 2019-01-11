import React ,{ Component } from 'react';
import axios from 'axios';
import './Requests.css';

class Requests extends Component {
    constructor() {
        super()
        
        this.state = {
            joins: [],
            view: false,
        }
    }

    componentDidMount = () => {
        this.getJoins();
    }
    
    getJoins = () => {
        axios.get(`/api/requests/${this.props.campaign_id}`)
            .then(res => {
                this.setState({joins: res.data});
            }).catch(err => {
                console.log(`Requests.getJoins ${err}`);
            })
    }

    acceptRequest = (campaign_id, user_id, join_request_id) => {
        axios.post('/api/requests', { campaign_id, user_id, join_request_id})
            .then(res => {
                this.getJoins();
            }).catch(err => {
                console.log(`Requests.acceptRequest ${err}`);
            })
    }

    declineRequest = (join_request_id) => {
        axios.delete(`/api/requests/${join_request_id}`)
            .then(res => {
                this.getJoins();
            }).catch(err => {
                console.log(`Requests.declineRequest ${err}`);
            })
    }

    toggle = () => {
        this.setState({view: !this.state.view});
    }
    
    render() {

        let requests = this.state.joins.map((join, i) => {
                return (
                    <div key={i} className='Request'>
                        <div className='RequestUsername'>
                            <p className='text'>Username:</p>{' '}
                            <h1 className='text'>{join.username}</h1>
                        </div>
                        <p className='text RequestMessage'>{' '}{join.message}</p>
                        <div className='RequestButtons'>
                            <button className='button' id='RequestButtons' onClick={() => this.acceptRequest(join.campaign_id, join.user_id, join.join_request_id)}>Accept</button>
                            <button className='button' id='RequestButtons' onClick={() => this.declineRequest(join.join_request_id)}>Decline</button>
                        </div>
                    </div>
                );
        })

        let render;
        if (this.state.view) {
            render = (<div className='Requests'>
                {requests}
                <button id='RequestsLeave' className='button' onClick={this.toggle}>Leave</button>
            </div>)
        } else {
            render = (<div className='requests'>
                <button className='button paper ToggleRequests' onClick={this.toggle}>View Requests</button>
            </div>)
        }
        return (
            <div>
                {render}
            </div>
        )
    }
}

export default Requests;