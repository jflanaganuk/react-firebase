import React, { Component } from 'react'
import styles from './UploadViewer.scss'
import FileTypeHandler from '../FileTypeHandler'

export default class UploadViewer extends Component{

    render(){
        const search = window.location.search
        const file = search.replace('?filename=','')
        return (
            <div className={styles.bodyContainer}>
                <div className={styles.uploadContainer}>
                    <FileTypeHandler
                        file={file}
                    />
                </div>
            </div>
        )
    }
}