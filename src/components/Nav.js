import React from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'


const Nav = (props) => {
    const {currentUser} = props

    return (
        <Router>
            <nav className = 'navigation'>                 

                <Link className = 'tohome' to='/'> Home </Link>

                <Link className = 'toprofile' to = '/profile'>Profile</Link> 

            </nav>
        </Router>
    )
}

export default Nav