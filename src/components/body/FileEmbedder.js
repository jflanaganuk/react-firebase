import React, { Component } from 'react'

export default class FileEmbedder extends Component{
    render(){
        switch(this.props.type){
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
            case 'image/webp':
            case 'image/icon':
            case 'image/vnd.microsoft.icon':
            case 'image/bmp':
            case 'image/tiff':
                return(
                    <img
                        src={this.props.url}
                        alt=''
                        style={{maxWidth: '100%', maxHeight: '50vh', margin: 'auto'}}
                    />
                )
            case 'video/mp4':
            case 'video/H264':
            case 'video/webm':
            case 'video/ogg':
            case 'video/quicktime':
                return (
                    <video 
                        controls 
                        style={{maxWidth: '100%', maxHeight: '50vh'}}
                    >
                        <source src={this.props.url}/>
                    </video>
                )
            case 'application/pdf':
                return (
                    <embed
                        width='800'
                        height='1000'
                        src={this.props.url}
                    ></embed>
                )
            case 'audio/wav':
            case 'audio/mp3':
            case 'audio/ogg':
                return(
                    <audio controls>
                        <source src={this.props.url}/>
                    </audio>
                )
            default:
                return <p>Unable to generate preview for this file type!</p>
        }
    }
}