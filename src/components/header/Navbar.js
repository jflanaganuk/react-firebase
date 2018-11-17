import React, { Component } from 'react'
import styles from '../Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class Navbar extends Component{

    constructor(props){
        super(props)

        this.state = {
            expanded: false,
            scrolled: false
        }

        this.setExpanded = this.setExpanded.bind(this)
        this.setScroll = this.setScroll.bind(this)
    }

    componentDidMount(){
        window.addEventListener('scroll', this.setScroll)
        this.navbar = document.getElementById('navbar')
        this.sticky = this.navbar.offsetTop
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.setScroll)
    }

    setExpanded(input){
        this.setState((prevState, props) => {
            return {
                ...prevState,
                expanded: input
            }
        })
    }

    setScroll(){
        let scrolled = false
        if (window.pageYOffset >= this.sticky) {
            scrolled = true
        } else {
            scrolled = false
        }
        this.setState((prevState, props) => {
            return {
                ...prevState,
                scrolled: scrolled,
                expanded: false
            }
        })
    }

    render(){
        let containerClass = styles.navbar
        if (this.state.scrolled) {
            containerClass += " " + styles.sticky
        }
        if (this.state.expanded) {
            containerClass += " responsive"
        }
        return(
            <div 
                className={containerClass}
                id="navbar"
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
        )
    }
}