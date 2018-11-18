import React, { Component } from 'react'
import ReactTable from 'react-table'
import firebase from 'firebase'
import 'react-table/react-table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faEye, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'

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

    setData(data){
        this.setState({
            data: data
        })
    }

    render(){
        const columns = [
            {
                Header: 'View',
                Cell: <FontAwesomeIcon icon={faEye}/>,
                width: 48
            },
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
                accessor: 'public',
                width: 64
            },
            {
                Header: 'Delete',
                Cell: <FontAwesomeIcon icon={faTimes}/>,
                width: 64
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