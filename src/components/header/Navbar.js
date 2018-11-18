import React, { Component } from 'react'
import styles from '../Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase'

export default class Navbar extends Component{

    constructor(props){
        super(props)

        this.state = {
            expanded: false,
            scrolled: false
        }

        this.setExpanded = this.setExpanded.bind(this)
        this.setScroll = this.setScroll.bind(this)
    }

    componentDidMount(){
        window.addEventListener('scroll', this.setScroll)
        this.navbar = document.getElementById('navbar')
        this.sticky = this.navbar.offsetTop
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.props.setSignIn(!!user)
        )
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.setScroll)
        this.unregisterAuthObserver()
    }

    setExpanded(input){
        this.setState((prevState, props) => {
            return {
                ...prevState,
                expanded: input
            }
        })
    }

    setScroll(){
        let scrolled = false
        if (window.pageYOffset >= this.sticky) {
            scrolled = true
        } else {
            scrolled = false
        }
        this.setState((prevState, props) => {
            return {
                ...prevState,
                scrolled: scrolled,
                expanded: false
            }
        })
    }

    render(){
        let containerClass = styles.navbar
        if (this.state.scrolled) {
            containerClass += " " + styles.sticky
        }
        if (this.state.expanded) {
            containerClass += " responsive"
        }
        return(
            <div 
                className={containerClass}
                id="navbar"
            >
                <a href="#home" className="active">Home</a>
                <a href="#portal">Portal</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
                {(this.props.signedIn) &&
                <a href="#" className="right" onClick={() => firebase.auth().signOut()}>Logout</a> // eslint-disable-line
                }
                {(this.props.signedIn) &&
                <span className={styles.welcomeMessage}>Welcome {firebase.auth().currentUser.displayName} !</span>
                }
                <a href="#" className="icon" onClick={() => this.setExpanded(!this.state.expanded)}> {// eslint-disable-line
                }
                    <FontAwesomeIcon icon={faBars} />
                </a>
            </div>
        )
    }
}