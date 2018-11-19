import React, { Component } from 'react'
import firebase from 'firebase'
import styles from '../Body.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default class UserInfo extends Component{
    render(){
        const user = firebase.auth().currentUser;
        return (
            <div className={styles.userContainer}>
                <h1 className={styles.userHeader}>User Info:</h1>
                <img
                    src={(user.photoURL != null ? user.photoURL : require('../../assets/avatar.png'))}
                    alt="Avatar"
                    className={styles.avatarContainer}
                />
                <div className={styles.userInfoContainer}>
                    <div className={styles.userInfoContainerColumn}>
                        <div className={styles.userInfoContainerCell}><b>Display Name</b></div>
                        <div className={styles.userInfoContainerCell}><b>Email Address</b></div>
                        <div className={styles.userInfoContainerCell}><b>Created at</b></div>
                        <div className={styles.userInfoContainerCell}><b>Last sign in</b></div>
                        <div className={styles.userInfoContainerCell}><b>Verified</b></div>
                    </div>
                    <div className={styles.userInfoContainerColumn}>
                        <div className={styles.userInfoContainerCell}>{user.displayName}</div>
                        <div className={styles.userInfoContainerCell}>{user.email}</div>
                        <div className={styles.userInfoContainerCell}>{user.metadata.creationTime}</div>
                        <div className={styles.userInfoContainerCell}>{user.metadata.lastSignInTime}</div>
                        <div className={styles.userInfoContainerCell}>{(user.emailVerified ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>)}</div>
                    </div>
                </div>
            </div>
        )
    }
}