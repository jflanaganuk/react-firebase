import React, { Component } from 'react'
import styles from './Footer.scss'

export default class Footer extends Component{
    render(){
        return(
            <div className={styles.footerContainer}>
                <div className={styles.footerInfo}></div>
            </div>
        )
    }
}