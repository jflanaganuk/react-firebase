import React, { Component } from 'react'
import styles from './Header.scss'

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
                <div className={styles.navbar}></div>
            </div>
        )
    }
}