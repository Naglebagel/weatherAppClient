import React, { Component } from 'react';
import './EditAccount.css';
import EditCities from './EditCities/EditCities.js'
const request = require('superagent');



class EditAccount extends Component {

	constructor(props){
		super(props);

		this.state = {
			cityname: '',
			countrycode: '',
			userCities: [],
			displayEdit: false,
			currentCityId: ''
		}
	}


	storeInfo = (e) => {
		const state = this.state;
		const name = e.currentTarget.name;
		state[name] = e.currentTarget.value;
		this.setState(state);
		console.log(this.state)
	}

	currentCities = () => {
    const that = this;
     request.get("http://localhost:9292/users/cities")
    .withCredentials()
    .end(function(err, data){
    	console.log(data)
    	if (err){
    		console.log(err)
    	} else if(data){
    		const state = that.state
    		console.log(data)
	      state.userCities = JSON.parse(data.text)
	      console.log(state.userCities)
	      that.setState(state)
    	}
    })
}

  deleteCity = (e) => {
  	const that = this;
	request.post("http://localhost:9292/cities/" + e.currentTarget.value)
	.type('form')
    .withCredentials()
    .send({_method: 'delete', id: e.currentTarget.value})
    .end(function(err, res){
    	const state = that.state
    	that.currentCities();
    	that.setState(state)
    })
}

  editCity = (e) => {
  	const state = this.state
  	console.log(e.currentTarget.value)
  	state.displayEdit = !this.state.displayEdit
  	state.currentCityId = e.currentTarget.value
  	this.setState(state)
  }

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.postEdit(this.state.cityname, this.state.countrycode);
		const state = this.state;
		state.cityname = '';
		state.countrycode = '';
		this.setState(state);
	}

	render() {
		const userCities = this.state.userCities.map((city, i) => {
			return <div key={i}>
					<li>{city.cityname}, {city.countrycode} <button value={city.id} onClick={this.editCity} className="btn btn-warning">Edit</button><button value={city.id} onClick={this.deleteCity} className="btn btn-warning">Delete</button></li>
					</div>
		})
		return(
			<div className="editStuff rounded">
				<h1>Hello {this.props.currentUser}</h1>
				<form onSubmit={this.handleSubmit}>
					<h4>Add a New City</h4>
					<input onChange={this.storeInfo} name='cityname' type='text' placeholder='City Name'/>
					<input onChange={this.storeInfo} name='countrycode' type='text' placeholder='Country'/><br></br>
					<button type="submit" className="btn btn-warning">Submit</button>
				</form>
				<div>
				<h3>Edit Current Cities</h3><button onClick={this.currentCities} className="btn btn-warning">Open</button>
					<ul>
					{userCities}
					{this.state.displayEdit ? <EditCities cityId={this.state.currentCityId} displayEdit={this.state.displayEdit}/> : null}
					</ul>
				</div>
			</div>

			)
		 
	}
}

export default EditAccount
