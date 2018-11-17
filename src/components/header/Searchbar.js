import React, { Component } from 'react'
import styles from '../Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class Searchbar extends Component{

    constructor(props){
        super(props)

        this.state = {
            searchShown: false
        }

        this.showSearch = this.showSearch.bind(this)
    }

    showSearch(input){
        this.setState((prevState, props) => {
            return {
                ...prevState,
                searchShown: input
            }
        })
    }

    render(){
        return(
            <div 
                className={styles.searchContainer}
                onMouseEnter={() => this.showSearch(true)}
                onMouseLeave={() => this.showSearch(false)}
            >
                <input 
                    className={this.state.searchShown ? styles.searchContainerInput : styles.searchContainerInput + " hidden"}
                    type="text"
                    placeholder="Search..."
                />
                <FontAwesomeIcon 
                    icon={faSearch}
                />
            </div>
        )
    }

}