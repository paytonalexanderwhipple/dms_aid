import React ,{ Component } from 'react';
import axios from 'axios';

class Requests extends Component {
    constructor() {
        super()
        
        this.state = {
            joins: [],
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
    
    render() {

        let requests = this.state.joins.map((join, i) => {
                return (
                    <div key={i}>
                        <h1>{join.username}</h1>
                        <p>{join.message}</p>
                        <button onClick={() => this.acceptRequest(join.campaign_id, join.user_id, join.join_request_id)}>Accept</button>
                        <button onClick={() => this.declineRequest(join.join_request_id)}>Decline</button>
                    </div>
                );
        })
        return (
            <div>
                {requests}
            </div>
        )
    }
}

export default Requests;