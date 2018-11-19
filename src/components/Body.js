import React, { Component } from 'react'
import styles from './Body.scss'
import firebase from 'firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import UserInfo from './body/UserInfo'
import UploadForm from './body/UploadForm'
import UploadsContainer from './body/UploadsContainer'

export default class Body extends Component{

    constructor(props){
        super(props)

        this.state = {
            data: []
        }

        this.fetchUploads = this.fetchUploads.bind(this)
        this.setData = this.setData.bind(this)
    }

    setData(data){
        this.setState({
            data: data
        })
    }

    fetchUploads(){
        const database = firebase.firestore()
        database.settings({
            timestampsInSnapshots: true
        })
        const userId = firebase.auth().currentUser.uid

        const docCollection = database.collection("files")
        docCollection.where("user", "==", userId)
        .get()
        .then((querySnapshot) => {
            let formattedData = []
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                const formattedDoc = {
                    name: doc.data().albumName,
                    date: new Date(doc.data().date.seconds*1000).toString(),
                    public: (doc.data().public ? <FontAwesomeIcon icon={faLockOpen}/> : <FontAwesomeIcon icon={faLock}/>),
                    key: doc.data().key
                }
                formattedData.push(formattedDoc)
            })
            console.log(formattedData)
            this.setData(formattedData)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    render(){
        return(
            <div className={styles.bodyContainer}>
                <div className={styles.bodyLeft}>
                    <div className={styles.topLeft}>
                        <UserInfo/>
                        <div className={styles.uploadStats}></div>
                    </div>
                    <div className={styles.uploadForm}>
                        <UploadForm
                            fetchUploads={this.fetchUploads}
                        />
                    </div>
                </div>
                <div className={styles.bodyRight}>
                    <div className={styles.uploadsContainer}>
                        <UploadsContainer
                            fetchUploads={this.fetchUploads}
                            data={this.state.data}
                        />
                    </div>
                </div>
            </div>
        )
    }
}