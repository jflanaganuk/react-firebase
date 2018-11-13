import React, { Component } from 'react'
import styles from './Header.scss'

export default class Header extends Component{
    render(){
        return (
            <div className={styles.headerContainer}>
                <div className={styles.topbar}>
                    <div className={styles.logoContainer}></div>
                    <div className={styles.loginContainer}>
                        <div className={styles.userInfo}></div>
                        <div className={styles.logInOut}></div>
                    </div>
                </div>
                <div className={styles.navbar}></div>
            </div>
        )
    }
}