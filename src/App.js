import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Storage from './components/Storage'

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

		this.uiConfig = {
			signInFlow: 'popup',
			signInSuccessUrl: '/signedIn',
			signInOptions: [
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			],
			callbacks: {
				signInSuccessWithAuthResult: () => false
			}
		}
	}

	componentDidMount(){
		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
			(user) => this.setState({isSignedIn: !!user})
		)
	}

	componentWillUnmount(){
		this.unregisterAuthObserver()
	}

	render() {
		if (!this.state.isSignedIn) {
			return(
				<div className="App">
					<header className="App-header">
						<h1>Uploadr</h1>
						<p>Please sign-in:</p>
						<StyledFirebaseAuth
							uiConfig={this.uiConfig}
							firebaseAuth={firebase.auth()}
						/>
					</header>
				</div>
			)
		}
		return (
			<div className="App">
				<header className="App-header">
					<h1>Uploadr</h1>
					<p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
					<Storage/>
					<button onClick={() => firebase.auth().signOut()}>Sign-out</button>
				</header>
			</div>
		);
	}
}

export default App;
