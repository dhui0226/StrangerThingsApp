import React, { useEffect, useState } from 'react'

import {grabToken} from '../api'


const Edits = (props) => {
    const {publicPosts, setPublicPosts, postId, setPostsId, showResults, setShowResults} = props;
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')


    const handleSubmit = async(event) => {
        event.preventDefault();

     


        const response = await fetch(`https://strangers-things.herokuapp.com/api/2104-UIC-RM-WEB-FT/posts/${postId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${grabToken()}` 
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location
                }
            })
        })

        const data = await response.json();
        // console.log('edit data:', data.data.post)
        if(data.data.post && data.data.post.title){
            const newPosts = publicPosts.map(post => {
                if(post._id === postId){
                    return data.data.post
                }else{
                    return post;
                }
            })
            setPublicPosts(newPosts)
            setTitle('')
            setDescription('')
            setPrice('')
            setLocation('')
            setPostsId(null)
        }
    }

    const cancelEdit = async() => {
        setIsEditClicked(false)
    }

    return (
        <>
           { showResults ?
           <>
           <div className = 'editform'>  
            <form className = 'postedit' onSubmit={handleSubmit}>
                <h1 className = 'd1'>Edit Post</h1>
                <label className = 'd2'>Title</label>
                <input className ='d2field' type ='text'
                
                onChange={(event) => {setTitle(event.target.value)}}></input>
                <label className = 'd2'>Description</label>
                <input className ='d2field' type='text' 
                
                onChange={(event) => {setDescription(event.target.value)}}></input>
                <label className = 'd2'>Price</label>
                <input className ='d2field' type='text' 
                
                onChange={(event) => {setPrice(event.target.value)}}></input>
                <label className = 'd2'>Location</label>
                <input className ='d2field' type='text'  
                
                onChange={(event) => {setLocation(event.target.value)}}></input>
                <button className ='submit'>
                    Submit
                </button>
            </form>

            <button className = 'close' onClick = {() => setShowResults(false)} >Close </button>    
            </div>
            </>
            : null}
        </>
    )
}



export default Edits