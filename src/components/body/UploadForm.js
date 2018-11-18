import React, { Component } from 'react'
import firebase from 'firebase'
import styles from '../Body.scss'

export default class UploadForm extends Component{
    
    constructor(props){
        super(props)

        const database = firebase.firestore()
        database.settings({
            timestampsInSnapshots: true
        })

        const storage = firebase.storage()
        const storageRef = storage.ref()
        const imagesRef = storageRef.child(firebase.auth().currentUser.uid)

        this.state = {
            name: null,
            files: null,
            ref: imagesRef,
            database: database,
            public: true,
            album: false
        }

        this.uploadFiles = this.uploadFiles.bind(this)
        this.setFile = this.setFile.bind(this)
        this.setName = this.setName.bind(this)
        this.addFilePathToDatabase = this.addFilePathToDatabase.bind(this)
        this.setPublic = this.setPublic.bind(this)
        this.setAlbum = this.setAlbum.bind(this)
    }

    setFile = (e) => {
        this.setState({
            files: e.target.files
        })
    }

    setName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    setPublic = (e) => {
        this.setState({
            public: e.target.checked
        })
    }

    setAlbum = (e) => {
        this.setState({
            album: e.target.checked
        })
    }

    uploadFiles(){
        //TODO - progress
        const files = this.state.files
        const d = new Date()
        const seconds = Math.round(d.getTime() / 1000)
        console.log(files)
        Array.from(files).map((file, key) => {
            const name = seconds + this.state.name + key
            console.log(file)
            this.state.ref.child(name).put(file).then((snapshot) => {
                console.log("uploaded file")
                console.log(snapshot)
                this.addFilePathToDatabase(key, name)
            })
        })
    }

    addFilePathToDatabase(key, name){
        const formattedDate = new Date()

        this.state.database.collection("files").add({
            albumName: this.state.name,
            user: firebase.auth().currentUser.uid,
            date: formattedDate,
            name: name,
            public: this.state.public,
            album: this.state.album,
            key: key
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id)
            console.log(docRef)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    render(){
        return (
            <div>
                <h2>Upload New File:</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td><input type="text" onChange={this.setName}/></td>
                        </tr>
                        <tr>
                            <td>File(s)</td>
                            <td>:</td>
                            <td><input type="file" onChange={this.setFile} multiple={true}/></td>
                        </tr>
                        <tr>
                            <td>Public</td>
                            <td>:</td>
                            <td><input type="checkbox" onChange={this.setPublic} defaultChecked={true}/> (If checked, anyone can view your file)</td>
                        </tr>
                        <tr>
                            <td>Combine into album</td>
                            <td>:</td>
                            <td><input type="checkbox" onChange={this.setAlbum}/> (If checked, all files will be presented as one entry)</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                            <td><input type="submit" onClick={this.uploadFiles}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}