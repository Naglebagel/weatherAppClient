import React, { Component } from 'react';
import './Show.css'

class Show extends Component {

	render() {
		const cityData = this.props.weather.map((weather, i) => {
			return <div className="card" key={i}>
							<img className="showImg card-img-top" alt={weather.weather[0].description} src={'http://openweathermap.org/img/w/'+ weather.weather[0].icon + '.png'}></img>
						<div className="card-body">
							<h4 className="showTitle"> Current weather in {weather.name}</h4>
							<p className="showLi">{weather.weather[0].main}</p>
							<p className="showLi">{weather.main.temp} ℉</p>
							<button type="button" className="btn btn-warning" onClick={this.props.resetWeatherCity}>Reset City</button>
						</div>
					</div>
		})

		return(
				<div className="showDiv">
				{cityData}
				</div>
			)
		 
	}
}

export default Show


