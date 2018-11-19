import React, { Component } from 'react'
import styles from '../Body.scss'

export default class UploadButton extends Component{
    render(){
        if (this.props.uploading) {
            return (
                'Uploading'
            )
        }
        return (
            <input 
                className={styles.uploadButton} 
                type="submit" 
                onClick={this.props.uploadFiles} 
                value="Upload"
            />
        )
    }
}