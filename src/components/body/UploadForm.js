import React, { Component } from 'react'
import firebase from 'firebase'
import styles from '../Body.scss'
import UploadButton from './UploadButton'

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
            name: '',
            files: null,
            ref: imagesRef,
            database: database,
            public: true,
            album: false,
            uploading: false,
            uploadProgress: 0,
            description: ''
        }

        this.uploadFiles = this.uploadFiles.bind(this)
        this.setFile = this.setFile.bind(this)
        this.setName = this.setName.bind(this)
        this.addFilePathToDatabase = this.addFilePathToDatabase.bind(this)
        this.setPublic = this.setPublic.bind(this)
        this.setAlbum = this.setAlbum.bind(this)
        this.setUploading = this.setUploading.bind(this)
        this.resetForm = this.resetForm.bind(this)
        this.setProgress = this.setProgress.bind(this)
        this.setDescription = this.setDescription.bind(this)
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

    setUploading(input){
        this.setState((prevState, props) => {
            return {
                ...prevState,
                uploading: input
            }
        })
    }

    setProgress(input){
        this.setState((prevState, props) => {
            return {
                ...prevState,
                progress: input
            }
        })
    }

    setDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    uploadFiles(){
        const files = this.state.files
        if (files !== null) {
            this.setUploading(true)
            const d = new Date()
            const seconds = Math.round(d.getTime() / 1000)
            Array.from(files).map((file, key) => {
                const name = seconds + this.state.name + key
                let uploadTask = this.state.ref.child(name).put(file)
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                    this.setProgress(progress)
                }, (error) => {
                    console.error(error)
                }, () => {
                    this.addFilePathToDatabase(key, name)
                })
                return null
            })
        } else {
            alert("You must select files to upload!")
        }
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
            key: key,
            description: this.state.description
        })
        .then((docRef) => {
            this.setUploading(false)
            this.props.fetchUploads()
            this.resetForm()
        })
        .catch((error) => {
            console.error(error)
            this.setUploading(false)
        })
    }

    resetForm = () => {
        document.getElementById('upload-form-container').reset()
    }
    
    render(){
        return (
            <div>
                <h2>Upload New File(s):</h2>
                <form id='upload-form-container'>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>
                                <input 
                                    className={styles.uploadName} 
                                    type="text" 
                                    onChange={this.setName} 
                                    placeholder="Enter file name"
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>File(s)</td>
                            <td>:</td>
                            <td>
                                <input 
                                    className={styles.uploadFiles} 
                                    type="file" 
                                    onChange={this.setFile} 
                                    multiple={true}
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td>Public</td>
                            <td>:</td>
                            <td>
                                <input 
                                    className={styles.uploadCheckbox} 
                                    type="checkbox" 
                                    onChange={this.setPublic} 
                                    defaultChecked={true}
                                    />
                                     (If checked, anyone can view your file)
                            </td>
                        </tr>
                        <tr>
                            <td>Album</td>
                            <td>:</td>
                            <td>
                                <input 
                                    className={styles.uploadCheckbox} 
                                    type="checkbox" 
                                    onChange={this.setAlbum}
                                    />
                                     (If checked, all files will be presented as one entry)
                            </td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>:</td>
                            <td>
                                <textarea
                                    className={styles.uploadDescription}
                                    onChange={this.setDescription}
                                ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <UploadButton
                                    uploadFiles={this.uploadFiles}
                                    uploading={this.state.uploading}
                                    progress={this.state.progress}
                                />
                             </td>
                        </tr>
                    </tbody>
                </table>
                </form>
            </div>
        )
    }
}