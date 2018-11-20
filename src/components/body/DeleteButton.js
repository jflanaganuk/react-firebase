import React, { Component } from 'react'
import firebase from 'firebase'
import styles from '../Body.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'

export default class DeleteButton extends Component{

    constructor(props){
        super(props)

        this.state = {
            pressed: false
        }

        this.deleteFile = this.deleteFile.bind(this)
        this.deleteFileFromStorage = this.deleteFileFromStorage.bind(this)
        this.deleteFileFromDatabase = this.deleteFileFromDatabase.bind(this)
    }

    deleteFile(){
        if (!this.state.pressed){
            this.setState({
                pressed: true
            })
            this.deleteFileFromStorage()
        }
    }

    deleteFileFromStorage(){

        const database = firebase.firestore()
        database.settings({
            timestampsInSnapshots: true
        })

        const storage = firebase.storage()

        const userId = firebase.auth().currentUser.uid

        database.collection("files").where("name", "==", this.props.file)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                if (data.user === userId){
                    storage.ref().child(data.user + '/' + data.name)
                    .delete()
                    .then(() => {
                        console.log("File removed from storage", this.props.file)
                        this.deleteFileFromDatabase()
                    })
                    .catch((err) => {
                        console.error("Error removing from storage", err)
                    })
                } else {
                    console.error("Cannot delete other peoples files")
                }
            })
        })

    }

    deleteFileFromDatabase(){

        const database = firebase.firestore()
        database.settings({
            timestampsInSnapshots: true
        })

        database.collection("files").where("name", "==", this.props.file)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc)
                const id = doc.id
                database.collection("files").doc(id)
                .delete()
                .then(() => {
                    console.log("Document succesfully deleted", this.props.file)
                    this.setState({
                        pressed: false
                    })
                    this.props.callback()
                })
                .catch((error) => {
                    console.error("Error removing doc, ", error)
                })
            })
        })

    }

    render(){
        return(
            <FontAwesomeIcon 
                className={styles.deleteButton}
                icon={(this.state.pressed) ? faSpinner : faTimes}
                onClick={this.deleteFile}
            />
        )
    }
}