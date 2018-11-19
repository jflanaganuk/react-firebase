import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default class UploadsContainer extends Component{

    componentDidMount(){
        this.props.fetchUploads()
    }

    render(){
        console.log(this.props.data)
        const columns = [
            {
                Header: 'View',
                accessor: 'trueName',
                Cell: row => <Link to={'/view?filename=' + row.value}><FontAwesomeIcon icon={faEye}/></Link>,
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
                    data={this.props.data}
                    columns={columns}
                    minRows={3}
                    defaultSorted={[
                        {
                            id: 'date',
                            desc: true
                        }
                    ]}
                    style={{maxHeight: '25rem'}}
                    showPagination={false}
                    noDataText="No uploads ...yet!"
                />
            </div>
        )
    }
}