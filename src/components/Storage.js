import React, { Component } from 'react'
import firebase from 'firebase'

export default class Storage extends Component{

    constructor(props){
        super(props);

        const database = firebase.firestore();
        database.settings({
            timestampsInSnapshots: true
        });

        const storage = firebase.storage()
        const storageRef = storage.ref()
        const imagesRef = storageRef.child(firebase.auth().currentUser.uid)

        this.state = {
            name: null,
            file: null,
            ref: imagesRef,
            database: database
        }
    
        this.uploadFile = this.uploadFile.bind(this)
        this.setFile = this.setFile.bind(this)
        this.setName = this.setName.bind(this)
        this.addFilePathToDatabase = this.addFilePathToDatabase.bind(this)
    }

    setName = (e) => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                name: e.target.value
            }
        })
    }

    setFile = (e) => {
        this.setState((prevState, props) => {
            return {
                ...prevState,
                file: e.target.files[0]
            }
        })
    }

    uploadFile = () => {
        const file = this.state.file
        console.log(file)
        this.state.ref.child(this.state.name).put(file).then((snapshot) => {
            console.log("uploaded file!")
            this.addFilePathToDatabase();
        })
    }

    addFilePathToDatabase = () => {
        const formattedDate = new Date();

        this.state.database.collection("files").add({
            user: firebase.auth().currentUser.uid,
            date: formattedDate,
            name: this.state.name
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error)
        })
    }

    render(){
        return (
            <div>
                <input type="text" onChange={this.setName}/><br/>
                <input type="file" onChange={this.setFile}/><br/>
                <input type="submit" onClick={this.uploadFile}/>
            </div>
        )
    }
}