import React, { Component } from 'react'
import firebase from 'firebase'
import FileEmbedder from './body/FileEmbedder'
import styles from './navigation/UploadViewer.scss'

export default class FileTypeHandler extends Component{

    constructor(props){
        super(props)

        this.state = {
            url: '',
            name: '',
            desc: '',
            type: '',
            folder: '',
            file: ''
        }

        this.getFileFromStorage = this.getFileFromStorage.bind(this)
        this.showPrivateMessage = this.showPrivateMessage.bind(this)
        this.downloadFile = this.downloadFile.bind(this)
    }

    componentDidMount(){
        const database = firebase.firestore()
        database.settings({
            timestampsInSnapshots: true
        })

        const userId = firebase.auth().currentUser.uid

        const docCollection = database.collection("files")
        docCollection.where("name", "==", this.props.file)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                if (data.public || (data.user === userId)){
                    this.getFileFromStorage(data.user, data.name, data.albumName, data.description, data.type)
                } else {
                    this.showPrivateMessage()
                }
            })
        })
    }

    getFileFromStorage(folder, file, name, desc, type){
        const storage = firebase.storage()

        storage.ref().child(folder + '/' + file).getDownloadURL()
        .then((url) => {
            this.setState({
                url: url,
                name: name,
                desc: desc,
                type: type,
                folder: folder,
                file: file
            })
        })
    }

    showPrivateMessage(){
        this.setState({
            url: require('../assets/lock.svg'),
            name: 'This upload is locked'
        })
    }

    downloadFile(){
        const storage = firebase.storage()
        storage.ref().child(this.state.folder + '/' + this.state.file).getDownloadURL().then(function(url) {
            // `url` is the download URL for 'images/stars.jpg'
          
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;

              let a = document.createElement("a");
                a.style = "display: none";
                document.body.appendChild(a);
                //Create a DOMString representing the blob 
                //and point the link element towards it
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = '';
                //programatically click the link to trigger the download
                a.click();
                //release the reference to the file by revoking the Object URL
                window.URL.revokeObjectURL(url);
            };
            xhr.open('GET', url);
            xhr.send();
          
          }).catch(function(error) {
            // Handle any errors
          });
    }

    render(){
        if (this.state.url === '') {
            return <p>Loading...</p>
        }
        return (
            <div className={styles.uploadContainer}>
                <div className={styles.uploadLeft}>
                    <FileEmbedder
                        type={this.state.type}
                        url={this.state.url}
                    />
                </div>
                <div className={styles.uploadRight}>
                    <h2>{this.state.name}</h2>
                    <p>{this.state.desc}</p>
                    <button 
                        onClick={this.downloadFile}
                        className={styles.downloadButton}
                    >Download</button>
                </div>
            </div>
        )
    }
}