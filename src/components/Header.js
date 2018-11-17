import React, { Component } from 'react'
import styles from './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component{

    constructor(props){
        super(props)

        this.state = {
            expanded: false
        }

        this.setExpanded = this.setExpanded.bind(this)
    }

    setExpanded(input){
        this.setState((prevState, props) => {
            return {
                ...prevState,
                expanded: input
            }
        })
    }

    render(){
        return (
            <div className={styles.headerContainer}>
                <div className={styles.topbar}>
                    <div className={styles.logoContainer}>
                        <img 
                            className={styles.logo}
                            src = {require('../assets/logoNew.png')}
                            alt = "Logo"
                        />
                    </div>
                    <div className={styles.loginContainer}>
                        <div className={styles.userInfo}>
                            USERINFO
                        </div>
                        <div className={styles.logInOut}>
                            <button className={styles.headerButton}>Sign Up</button>
                            <button className={styles.headerButton}>Login</button>
                        </div>
                    </div>
                </div>
                <div 
                    className={this.state.expanded ? styles.navbar + " responsive" : styles.navbar}
                >
                    <a href="#home" className="active">Home</a>
                    <a href="#portal">Portal</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a href={void(0)} className="icon" onClick={() => this.setExpanded(!this.state.expanded)}>
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>
            </div>
        )
    }
}