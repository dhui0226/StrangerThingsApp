import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'


const Profile = (props) => {
    const {test} = props;
    const [userMessages, setUserMessages] = useState([])
    //const userIdStuff = test();

    //console.log('test', userIdStuff)

    //test().then(setUserMessages())

    useEffect(() => {
        test().then(result => setUserMessages(result.data.posts))
    }, [])

    //console.log('yabba', userMessages)

    return (
        <>
            <h1>Welcome</h1>
            <h2>My Messages:</h2>
            <div> 
                {userMessages.map((message, idx) => {
                    return <div key={idx}>
                        <h1>{message.title}</h1>
                    </div>
                })}
            </div>
        </>
    )
}

export default Profile;