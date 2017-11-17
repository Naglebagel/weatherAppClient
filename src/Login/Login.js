import React, { Component } from 'react';
import './Login.css';


class Login extends Component {

	constructor(){
		super();

		this.state = {
			username: '',
			password: ''
		}
	}

	storeInfo = (e) => {
		const state = this.state;
		const name = e.currentTarget.name;
		state[name] = e.currentTarget.value;
		this.setState(state);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.postLogin(this.state.username, this.state.password);
		const state = this.state;
		state.username = '';
		state.password = '';
		this.setState(state);
	}

	render() {

		return(
			<div className="loginDiv rounded">
				<form onSubmit={this.handleSubmit}>
					<h4>Account Login</h4>
					<input onChange={this.storeInfo} name='username' type='text' placeholder='Username'/><br></br>
					<input onChange={this.storeInfo} name='password' type='password' placeholder='Password'/><br></br>
					<button type="submit" className="btn btn-warning">Sign In</button>
				</form>
			</div>
			)
		 
	}
}

export default Login


