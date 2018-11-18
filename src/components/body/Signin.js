import React, { Component } from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import styles from '../Body.scss';

export default class Signin extends Component{

    constructor(props){
        super(props)

        this.uiConfig = {
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
                signInSuccessWithAuthResult: () => false
            }
        }
    }

    componentDidMount(){
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.props.setSignIn(!!user)
        )
    }

    componentWillUnmount(){
        this.unregisterAuthObserver()
    }

    render(){
        return(
            <div className={styles.signInContainer}>
                <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        )
    }

}