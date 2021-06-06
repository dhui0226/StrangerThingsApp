import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'



const Profile = (props) => {
    const {currentUser} = props;
    const [userMessages, setUserMessages] = useState([])

    useEffect(() => {
        currentUser().then(result => setUserMessages(result.data.posts))
    }, [])

    //console.log('yabba', userMessages)

    return (
        <>
            <h1 className = 'myposts'>My Posts</h1>
            <div className = 'userposts'> 
                {userMessages.map((message, idx) => {
                    return <div className='post' key={idx}>
                        <h1 className = 'q1t'>{message.title}</h1>
                        <p className = 'q1'>{message.description}</p>
                        <h3 className = 'q1'>Price: {message.price}</h3>
                        <h3 className = 'q1'>Location: {message.location}</h3>       
                    </div>
                })}
            </div>
        </>
    )
}

export default Profile;