import React, { Component } from 'react';
import './EditCities.css'
const request = require('superagent');

class EditCities extends Component {
	constructor(){
		super();

		this.state = {
			cityname: '',
			countrycode: '',
		}
	}
changeCityInfo = (cityname, countrycode, cityId) => {
	request.post("https://weatherappapi.herokuapp.com/cities/" + cityId)
	.type('form')
    .withCredentials()
    .send({_method: 'put', id: cityId, cityname: cityname, countrycode: countrycode})
    .end(function(err, data){

    })
}

	storeInfo = (e) => {
		const state = this.state;
		const name = e.currentTarget.name;
		state[name] = e.currentTarget.value;
		this.setState(state);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.changeCityInfo(this.state.cityname, this.state.countrycode, this.props.cityId);
		const state = this.state;
		state.cityname = '';
		state.countrycode = '';
		state.cityId = '';
		this.setState(state);
	}

	render() {
		
			return <div>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.storeInfo} name='cityname' type='text' placeholder='City Name'/>
					<input onChange={this.storeInfo} name='countrycode' type='text' placeholder='Country'/><br></br>
					<button type="submit" className="btn btn-warning">Submit</button>
				</form>
			</div>
		 
	}
}

export default EditCities