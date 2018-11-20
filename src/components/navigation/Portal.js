import React, { Component } from 'react'
import firebase from 'firebase'
import PortalViewer from '../portal/PortalViewer';
import styles from './Portal.scss';

export default class Portal extends Component{

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
        
        const docCollection = database.collection("files")
        docCollection.where("public","==", true)
        .get()
        .then((querySnapshot) => {
            console.log(querySnapshot)
            let formattedData = []
            querySnapshot.forEach((doc) => {
                const formattedDoc = {
                    trueName: doc.data().name,
                    name: doc.data().albumName,
                    date: new Date(doc.data().date.seconds*1000).toString(),
                    key: doc.data().key
                }
                formattedData.push(formattedDoc)
            })
            this.setData(formattedData)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    render(){
        return (
            <div className={styles.bodyContainer}>
                <PortalViewer
                    fetchUploads={this.fetchUploads}
                    data={this.state.data}
                />
            </div>
        )
    }
}