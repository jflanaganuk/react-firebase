import React, { Component } from 'react'
import styles from './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends Component{
    render(){
        return(
            <div className={styles.footerContainer}>
                <div className={styles.footerInfo}>
                    <FontAwesomeIcon icon={faCopyright}/> Joshua Flanagan 2018
                </div>
            </div>
        )
    }
}