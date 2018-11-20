import React, { Component } from 'react'
import firebase from 'firebase'
import styles from '../Body.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, faSpinner } from '@fortawesome/free-solid-svg-icons'

export default class PrivacyToggle extends Component{

    constructor(props){
        super(props)

        this.state = {
            pressed: false,
            public: this.props.public
        }

        this.togglePrivacy = this.togglePrivacy.bind(this)
    }

    togglePrivacy(){

        this.setState({
            pressed: true
        })

        const database = firebase.firestore()
        database.settings({
            timestampsInSnapshots: true
        })

        const userId = firebase.auth().currentUser.uid

        database.collection("files").where("name","==",this.props.file)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().user === userId) {
                    const id = doc.id
                    const thisDoc = database.collection("files").doc(id)
                    thisDoc.set({
                        public: !this.state.public
                    }, {merge: true})
                    .then(() => {
                        this.setState({
                            public: !this.state.public,
                            pressed: false
                        })
                    })
                    .catch((err) => {
                        console.error("Error editing document", err)
                    })
                } else {
                    console.error("You cannot edit other peoples documents")
                }
            })
        })

    }

    render(){
        let icon;
        if (this.state.pressed){
            icon = faSpinner
        } else {
            if (this.state.public) {
                icon = faLockOpen
            } else {
                icon = faLock
            }
        }
        return(
            <FontAwesomeIcon
                className={styles.deleteButton}
                icon={icon}
                onClick={this.togglePrivacy}
            />
        )
    }

}