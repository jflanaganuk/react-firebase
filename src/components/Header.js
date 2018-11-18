import React, { Component } from 'react'
import styles from './Header.scss'
import Navbar from './header/Navbar'
import Searchbar from './header/Searchbar'

export default class Header extends Component{
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
                    <Searchbar />
                </div>
                <Navbar 
                    signedIn={this.props.signedIn}
                    setSignIn={this.props.setSignIn}
                />
            </div>
        )
    }
}