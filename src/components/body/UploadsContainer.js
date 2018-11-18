import React, { Component } from 'react'
import ReactTable from 'react-table'
import firebase from 'firebase'
import 'react-table/react-table.css'

export default class UploadsContainer extends Component{

    constructor(props){
        super(props)

        this.state = {
            data: []
        }

        this.setData = this.setData.bind(this)
    }

    componentDidMount(){
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
                    public: (doc.data().public ? 'True' : 'False'),
                    album: (doc.data().album ? 'True' : 'False'),
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

    setData(data){
        this.setState({
            data: data
        })
    }

    render(){
        const columns = [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Uploaded',
                accessor: 'date'
            },
            {
                Header: 'Public',
                accessor: 'public'
            },
            {
                Header: 'Album',
                accessor: 'album'
            }
        ]
        return (
            <div>
                <h1>Uploads:</h1>
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                    minRows={3}
                    style={{maxHeight: '25rem'}}
                    showPagination={false}
                    noDataText="No uploads ...yet!"
                />
            </div>
        )
    }
}