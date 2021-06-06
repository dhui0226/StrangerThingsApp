import React from 'react'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { grabToken } from '../api'

const Nav = (props) => {
    const {test} = props

    return (
        <Router>
            <nav className = 'navigation'>                 
                {/* <Link to='/'>Main</Link> */}
                <Link to='/'> Home </Link>
                <Link to='/posts'> Posts </Link>
                {/* <Link to ='/profile'>Profile</Link> */} {/* profile/username gotta import */}
                <Link to={`/profile/${test}`}>Profile</Link> 
                <Link to='/logout'> Logout </Link>
                <Link to='/register'>Register</Link>
                <div className='test route'>
                    {/* <Route path={`/profile/${test}`} component={profile} /> */}
                </div>
            </nav>
        </Router>
    )
}

export default Nav