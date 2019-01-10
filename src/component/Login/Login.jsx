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
                <div className='corner TL'>
                    <div className='brown c1'/>
                    <div className='brown c2'/>
                    <div className='brown c3'/>
                </div>
                <div className='corner TR'>
                    <div className='brown c1'/>
                    <div className='brown c2'/>
                    <div className='brown c4'/>
                </div>
                <div className='LoginPaper paper'>
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
                    <button onClick={this.login} className='login-button button'>Login</button>
                    <button onClick={this.register} className='register-button button'>Register</button>
                </div>
                <div className='corner BL'>
                    <div className='brown c1'/>
                    <div className='brown c3'/>
                    <div className='brown c4'/>
                </div>
                <div className='corner BR'>
                    <div className='brown c2'/>
                    <div className='brown c3'/>
                    <div className='brown c4'/>
                </div>
            </div>
        );
    };
};

export default Login;