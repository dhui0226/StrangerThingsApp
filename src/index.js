import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import {grabToken, clearToken, publicPosts} from './api'
import {Register, Posts, Profile, AddPost, Nav, Edit} from './components'

const Main = () =>{
    const [loggedIn, setIsLoggedIn] = useState(grabToken());
    const [publicPosts, setPublicPosts] = useState ([])


    const currentUser = async () => {
        const response = await fetch('https://strangers-things.herokuapp.com/api/2104-UIC-RM-WEB-FT/users/me',
        { headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${grabToken()}` 
        } })
    
        const data = await response.json();
        return data

    }

    useEffect(() => {
        fetch('https://strangers-things.herokuapp.com/api/2104-UIC-RM-WEB-FT/posts')
        .then(response => response.json())
        .then(result => setPublicPosts(result.data.posts))  
    }, []);

    console.log('public', publicPosts)

    return (        
        <>

        <div className = 'home'>

            {loggedIn ? (

                <>

                <div className="header">
                         
                    <div className = 'topper'>
                        <Nav currentUser = {currentUser}/>
                        <button className='logoutbutton' onClick={() => {
                            clearToken() 
                            setIsLoggedIn('') 
 
                            location.assign('/')

                        }}>Log Out</button> 
                    </div>
                     
                </div>
                <h1 className = 'stranger'>Stranger's Things</h1>       
               
               <Route exact path = '/' render = {() => <Posts publicPosts={publicPosts} setPublicPosts={setPublicPosts} loggedIn ={loggedIn} setIsLoggedIn ={setIsLoggedIn} />} />
               <Route path = '/profile' render = {() => <Profile currentUser = {currentUser} />} /> 
                <span>


                </span>



                </>
            ) : (
                <Register setIsLoggedIn = {setIsLoggedIn} />

            )}

        </div>

        </>

    )
}

ReactDOM.render(
    <Router> 
        <Main />
    </Router>,
    document.getElementById('app')
)