import React, { Component } from 'react';
import { postData, putData } from './crudHelper';
import './App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPassword: '',
      signupName: '',
      signupEmail: '',
      signupPassword: ''
    };
    this.loginSubmit = this.loginSubmit.bind(this);
    this.signupSubmit = this.signupSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };
  loginSubmit(event) {
    const email = this.state.loginEmail.trim();
    const password = this.state.loginPassword.trim();
    if (email && password) {
        event.preventDefault();
        putData('http://localhost:5000/login', {email: email, password: password})
        .then(data => {
            console.log(data);
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    };
    console.log(this.state);
  };
  signupSubmit(event) {
    const name = this.state.signupName.trim();
    const email = this.state.signupEmail.trim();
    const password = this.state.signupPassword.trim();
    if (name && email && password) {
        event.preventDefault();
        postData('http://localhost:5000/signup', {name: name, email: email, password: password})
        .then(data => {
            console.log(data);
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error));
    };
    console.log(this.state);
  };
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value});
  };
  render() {
    return (
        <div>
            <form onSubmit={this.loginSubmit}>
                <h2>Login</h2>
                <label> Email
                    <input required type="email"
                     value={this.state.loginEmail}
                      onChange={this.handleInputChange}
                       name="loginEmail" />
                </label>
                <br />
                <label> Password
                    <input required type="password"
                     value={this.state.loginPassword}
                      onChange={this.handleInputChange}
                       name="loginPassword" />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <form onSubmit={this.signupSubmit}>
                <h2>Sign up</h2>
                <label>Name
                    <input required type="text"
                     value={this.state.signupName}
                      onChange={this.handleInputChange}
                       name="signupName" />
                </label>
                <br />
                <label>Email
                    <input required type="email" value={this.state.signupEmail} onChange={this.handleInputChange} name="signupEmail" />
                </label>
                <br />
                <label> Password
                    <input required type="password" value={this.state.signupPassword} onChange={this.handleInputChange} name="signupPassword" />
                </label>
                <br />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
  };
};

export default Login;
