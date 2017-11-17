import React, { Component } from 'react';
import './UserShow.css';



class UserShow extends Component {

	constructor(){
		super();

		this.state = {
			
		}
	}

	componentDidMount(){
		this.props.userCities()
	}

	render() {
		const cityData = this.props.dispArr.map((weather, i) => {
			return <div className="weather card" key={i}>
					<img className="card-img-top" alt={weather.weather[0].description} src={'http://openweathermap.org/img/w/'+ weather.weather[0].icon + '.png'}></img>
					<div className="card-body">
					<h4> Current Weather in {weather.name}</h4>
					<p>{weather.weather[0].main}</p>
					<p>{weather.main.temp} ℉</p>
					</div>
					</div>
		})
		
		return(
			<div>
				{cityData}
			</div>
			)
		 
	}
}

export default UserShow