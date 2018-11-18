import React, { Component } from 'react'
import styles from './Body.scss'

export default class Body extends Component{
    render(){
        return(
            <div className={styles.bodyContainer}>
                <div className={styles.bodyLeft}>
                    <div className={styles.topLeft}>
                        <div className={styles.avatarContainer}></div>
                        <div className={styles.uploadStats}></div>
                    </div>
                    <div className={styles.uploadForm}></div>
                </div>
                <div className={styles.bodyRight}>
                    <div className={styles.uploadsContainer}></div>
                </div>
            </div>
        )
    }
}