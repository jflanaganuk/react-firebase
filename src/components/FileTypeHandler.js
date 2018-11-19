import React, { Component } from 'react'
import firebase from 'firebase'

export default class FileTypeHandler extends Component{

    constructor(props){
        super(props)

        this.state = {
            url: '',
            name: ''
        }

        this.getFileFromStorage = this.getFileFromStorage.bind(this)
        this.showPrivateMessage = this.showPrivateMessage.bind(this)
    }

    componentDidMount(){
        //TODO - handle more than images
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
                    this.getFileFromStorage(data.user, data.name, data.albumName)
                } else {
                    this.showPrivateMessage()
                }
            })
        })
    }

    getFileFromStorage(folder, file, name){
        const storage = firebase.storage()

        storage.ref().child(folder + '/' + file).getDownloadURL()
        .then((url) => {
            this.setState({
                url: url,
                name: name
            })
        })
    }

    showPrivateMessage(){
        this.setState({
            url: require('../assets/lock.svg'),
            name: 'This upload is locked'
        })
    }

    render(){
        if (this.state.url === '') {
            return <p>Loading...</p>
        }
        return (
            <div>
                <h2>{this.state.name}</h2>
                <img
                    src={this.state.url}
                    alt=''
                    style={{maxWidth: '100%', maxHeight: '50vh', margin: 'auto'}}
                />
                <a href={this.state.url} target="_blank" type="application/octet-stream" rel="noopener noreferrer" download={this.state.name}>
                    download
                </a>
            </div>
        )
    }
}