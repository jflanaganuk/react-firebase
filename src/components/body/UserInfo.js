import React, { Component } from 'react'
import firebase from 'firebase'
import styles from '../Body.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default class UserInfo extends Component{
    render(){
        const user = firebase.auth().currentUser;
        return (
            <div className={styles.avatarContainer}>
                <h1>User Info:</h1>
                <table>
                    <tbody>
                        <tr>
                            <td rowSpan={6}>
                                <img 
                                    src={(user.photoURL != null) ? user.photoURL : require('../../assets/avatar.png')}
                                    alt="Avatar"
                                    width={64}
                                    height={64}
                                    style={{paddingRight: '1rem'}}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Display Name</td>
                            <td>:</td>
                            <td>{user.displayName}</td>
                        </tr>
                        <tr>
                            <td>Email Address</td>
                            <td>:</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Created at</td>
                            <td>:</td>
                            <td>{user.metadata.creationTime}</td>
                        </tr>
                        <tr>
                            <td>Last sign in</td>
                            <td>:</td>
                            <td>{user.metadata.lastSignInTime}</td>
                        </tr>
                        <tr>
                            <td>Verified</td>
                            <td>:</td>
                            <td>{(user.emailVerified ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faTimes}/>)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}