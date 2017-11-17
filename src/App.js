import React, { Component } from 'react';
import './App.css';
import Show from './Show/Show.js';
import Retrieve from './Retrieve/Retrieve.js';
import Create from './CreateAccount/Create.js';
import Login from './Login/Login.js';
import EditAccount from './EditAccount/EditAccount.js';
import UserShow from './UserShow/UserShow.js';
const request = require('superagent');

class App extends Component {

  constructor(){
    super();

    this.state = {
      weatherCity: [],
      showWeather: false,
      showNewAccount: false,
      loggedIn: false,
      currentUser: '',
      loggedInString: '',
      logInError: '',
      enableEdit: false,
      userCities: [],
      userCitiesDisplay: []
    }
  }

  componentDidMount(){
    this.getReqCity();
  }

getReqCity = (city, country) => {
   fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city +','+ country +'&units=imperial&APPID=13bbcfeda97fb1726ea42ebf39817e5a')
    .then(response => response.json())
    .then(data => {
      const state = this.state;
      state.weatherCity.shift();
      state.weatherCity.push(data);
      state.showWeather = !this.state.showWeather
      this.setState(state)
    })
}

resetWeatherCity = () => {
  const state = this.state
  state.showWeather = !this.state.showWeather
  this.setState(state)
}

userCities = () => {
    const that = this;
     request.get("http://localhost:9292/users/cities")
    .withCredentials()
    .end(function(err, data){
      console.log(data)
      if (err){
        console.log(err)
      } else if(data){
        console.log(data, 'this is userShow calling for a users cities')
        const array = JSON.parse(data.text)
        for (let i = 0; i < array.length; i++){
          fetch('http://api.openweathermap.org/data/2.5/weather?q=' + array[i].cityname +','+ array[i].countrycode +'&units=imperial&APPID=13bbcfeda97fb1726ea42ebf39817e5a')
            .then(response => response.json())
            .then(data => {
              const state = that.state;
              console.log(data)
              state.userCitiesDisplay.push(data)
              console.log(state.userCitiesDisplay, 'this is the array to map')
              that.setState(state)
            })
        }
      }
    })
}

postCreate = (username, password) => {
  const that = this;
    request.post("http://localhost:9292/users")
    .type('form')
    .send({username: username, password: password})
    .end(function(err, data){
        const state = that.state
        state.showNewAccount = !that.state.showNewAccount
        that.setState(state)
    })
  }

newAccount = () => {
  const state = this.state;
  state.showNewAccount = !this.state.showNewAccount;
  state.loggedIn = false;
  this.setState(state);
}

newLogin = () => {
  const state = this.state;
  state.loggedIn = !this.state.loggedIn;
  state.showNewAccount = false;
  this.setState(state);
}

newEdit = () => {
  const state = this.state;
  state.enableEdit = !this.state.enableEdit;
  state.userCitiesDisplay = [];
  this.setState(state);
}

currentUser = (data) => {
  const state = this.state;
  state.loggedUser = data.req._data.username
  this.setState(state);
}

userLogout = () => {
  const that = this;
  request.get("http://localhost:9292/users/logout")
    .withCredentials()
    .end(function(err, data){
      const state = that.state
      state.loggedIn = !that.state.loggedIn;
      state.loggedInString = data.text;
      state.userCitiesDisplay = [];
      that.setState(state);
    })
}

postEdit = (cityname, countrycode) => {
  const that = this;
      request.post("http://localhost:9292/cities/create")
      .type('form')
      .withCredentials()
      .send({cityname: cityname, countrycode: countrycode})
      .end(function(err, data){
        const state = that.state
        state.enableEdit = !that.state.enableEdit
        state.userCitiesDisplay = []
        that.setState(state)
      })
  }

postLogin = (username, password) => {
  const that = this;
    request.post("http://localhost:9292/users/login")
    .type('form')
    .send({username: username, password: password})
    .withCredentials()
    .end(function(err, data){
      if (err){
        console.log(err)
      } else if(data){
         if (data.text === 'hey your logged in'){
               const state = that.state;
               state.currentUser = data.req._data.username;
               state.loggedInString = data.text;
               that.setState(state);
        } else if (data.text === ''){
            const state = that.state;
            state.logInError = "Username or Password incorrect, please try again.";
            that.setState(state);
        }
      }
    })
  }

  render() {
    if (this.state.loggedInString === ''){
    return (
      <div className="App container-fluid">
      <header className="rounded">
        <h1>Weather App</h1>
        <nav>
          <ul>
          <div className="row">
          <div className="col">
            <li onClick={this.newAccount}>Create Account</li>
            </div>
            <div className="col">
            <li onClick={this.newLogin}>Login</li>
            </div>
            </div>
          </ul>
        </nav>
      </header>
      <div className="rounded">
        {this.state.showNewAccount ? <Create getReqCity={this.getReqCity} postCreate={this.postCreate}/> : null}
        {this.state.loggedIn ? <Login getReqCity={this.getReqCity} postLogin={this.postLogin}/> : null}
        {this.state.showWeather ? <Retrieve getReqCity={this.getReqCity}/> : <Show weather={this.state.weatherCity} getReqCity={this.getReqCity} getReqZip={this.getReqZip} resetWeatherCity={this.resetWeatherCity}/>}
      </div>
    </div>  
    );
    } else if (this.state.loggedInString === 'hey your logged in'){
      return(
        <div className="App container-fluid">
      <header className="rounded">
      <h1>Weather App</h1>
        <nav>
          <ul>
          <div className="row">
           <div className="col">
            <li onClick={this.userLogout}>Logout</li>
            </div>
            <div className="col">
            <li onClick={this.newEdit}>Add/Edit Cities</li>
            </div>
            </div>
          </ul>
        </nav>
      </header>
      <div className="rounded">
        {this.state.enableEdit ? <EditAccount currentUser={this.state.currentUser} postEdit={this.postEdit}/> : <UserShow userCities={this.userCities} dispArr={this.state.userCitiesDisplay}/>}
      </div>
    </div> 
        );
    }
  }
}

export default App;
