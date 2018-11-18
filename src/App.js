import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase'
import Signin from './components/body/Signin'
import Footer from './components/Footer'
import Header from './components/Header'
import Body from './components/Body'

const config = {
	apiKey: "AIzaSyD3taQFpVwhb6VOgWTn62gO725-qknCc5Q",
	authDomain: "uploadr-e33b8.firebaseapp.com",
	databaseURL: "https://uploadr-e33b8.firebaseio.com",
	projectId: "uploadr-e33b8",
	storageBucket: "uploadr-e33b8.appspot.com",
	messagingSenderId: "322444451251"
}
firebase.initializeApp(config)

class App extends Component {

	constructor(props){
		super(props)

		this.state = {
			isSignedIn: false
		}

		this.setSignIn = this.setSignIn.bind(this)
	}

	setSignIn(user){
		this.setState((prevState, props) => {
			return {
				...prevState,	
				isSignedIn: !!user
			}
		})
	}

	render() {
		return (
			<div>
				<Header 
					signedIn={this.state.isSignedIn}
					setSignIn={this.setSignIn}
				/>
				{(!this.state.isSignedIn) 
				? 
					<Signin
						setSignIn={this.setSignIn}
					/>
				:
					<Body />
				}
				<Footer />
			</div>
		);
	}
}

export default App;
