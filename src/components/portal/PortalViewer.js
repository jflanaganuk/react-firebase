import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import styles from '../Body.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default class PortalViewer extends Component{

    componentDidMount(){
        this.props.fetchUploads()
    }

    render(){

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
            }
        ]

        return (
            <div>
                <h1>Portal</h1>
                <h2>View all public files</h2>
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
                    className={styles.reactTable}
                />
            </div>
        )
    }
}