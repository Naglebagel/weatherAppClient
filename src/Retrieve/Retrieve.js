import React, { Component } from 'react';
import './Retrieve.css'

class Retrieve extends Component {
	constructor(){
		super();

		this.state = {
			cityName: '',
			countryCode: '',
			showWeather: false
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
		this.props.getReqCity(this.state.cityName, this.state.countryCode);
		const state = this.state;
		state.showWeather = !this.state.showWeather;
		state.cityName = '';
		state.countryCode = '';
		this.setState(state);
	}


	render() {
		return(
			<div className="retDiv rounded">
				<form onSubmit={this.handleSubmit}>
					<h4>Enter a City Name to obtain weather</h4>
					<input onChange={this.storeInfo} name="cityName" placeholder="City"/><br></br>
					<input onChange={this.storeInfo} name="countryCode" placeholder="Country"/><br></br> 
					<button type="submit" className="btn btn-warning">Retrieve Weather</button>
				</form>
			</div>
			)
		 
	}
}

export default Retrieve


