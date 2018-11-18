import React, { Component } from 'react'
import styles from './Body.scss'
import UserInfo from './body/UserInfo'
import UploadForm from './body/UploadForm'
import UploadsContainer from './body/UploadsContainer'

export default class Body extends Component{
    render(){
        return(
            <div className={styles.bodyContainer}>
                <div className={styles.bodyLeft}>
                    <div className={styles.topLeft}>
                        <UserInfo/>
                        <div className={styles.uploadStats}></div>
                    </div>
                    <div className={styles.uploadForm}>
                        <UploadForm/>
                    </div>
                </div>
                <div className={styles.bodyRight}>
                    <div className={styles.uploadsContainer}>
                        <UploadsContainer/>
                    </div>
                </div>
            </div>
        )
    }
}