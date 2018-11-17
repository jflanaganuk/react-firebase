import React, { Component } from 'react'
import styles from './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

export default class Header extends Component{

    constructor(props){
        super(props)

        this.state = {
            expanded: false,
            searchShown: false
        }

        this.setExpanded = this.setExpanded.bind(this)
        this.showSearch = this.showSearch.bind(this)
    }

    setExpanded(input){
        this.setState((prevState, props) => {
            return {
                ...prevState,
                expanded: input
            }
        })
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
        return (
            <div className={styles.headerContainer}>
                <div className={styles.topbar}>
                    <div className={styles.logoContainer}>
                        <img 
                            className={styles.logo}
                            src = {require('../assets/logoNew.png')}
                            alt = "Logo"
                        />
                    </div>
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
                </div>
                <div 
                    className={this.state.expanded ? styles.navbar + " responsive" : styles.navbar}
                >
                    <a href="#home" className="active">Home</a>
                    <a href="#portal">Portal</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a href="#login" className="right">Login</a>
                    <a href="#signup" className="right">Sign Up</a>
                    <a href={void(0)} className="icon" onClick={() => this.setExpanded(!this.state.expanded)}>
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>
            </div>
        )
    }
}