import React, { Component } from 'react';
import './Create.css'


class Create extends Component {

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
		this.props.postCreate(this.state.username, this.state.password);
		const state = this.state;
		state.username = '';
		state.password = '';
		this.setState(state);
	}

	render() {

		return(
			<div className="createDiv rounded">
				<form onSubmit={this.handleSubmit}>
					<h4>New Account</h4>
					<input onChange={this.storeInfo} name='username' type='text' placeholder='Username'/><br></br>
					<input onChange={this.storeInfo} name='password' type='password' placeholder='Password'/><br></br>
					<button type="submit" className="btn btn-warning">Create Account</button>
				</form>
			</div>
			)
		 
	}
}

export default Create


