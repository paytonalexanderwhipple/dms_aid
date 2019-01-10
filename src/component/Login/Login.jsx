import React ,{ Component } from 'react';
import axios from 'axios';
import './Login.css';

class Login extends Component {
    constructor() {
        super()
        
        this.state = {
            username: '',
            password: '',
        };
    };

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }
    
    login = () => {
        const { username, password } = this.state;
        axios.post('/auth/login', { username, password })
            .then(res => {
                this.props.history.push('/landing');
            }).catch(err => {
                alert(err.response.request.response);
                console.log(`Login.login ${err}`);
            })
    }

    register = () => {
        const { username, password } = this.state;
        axios.post('/auth/register', { username, password })
            .then(res => {
                this.props.history.push('/landing');
            }).catch(err => {
                alert(err.response.request.response);
                console.log(`Login.register ${err}`);
            });
    }

    render() {
        return (
            <div className='Login'>
                <input
                    className='username-input input'
                    type="text"
                    name='username'
                    placeholder='Username'
                    onChange={this.handleInput}/>
                <input 
                    className='password-input input'
                    type="text"
                    name='password'
                    placeholder='Password'
                    onChange={this.handleInput}/>
                <button onClick={this.login} className='login-button'>Login</button>
                <button onClick={this.register} className='register-button'>Register</button>
            </div>
        );
    };
};

export default Login;