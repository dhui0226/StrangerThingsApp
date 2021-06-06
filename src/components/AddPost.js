import React, { useState } from 'react'
import {grabToken} from '../api'

const AddPost = ({publicPosts, setPublicPosts, addPostClicked, setAddPostClicked}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [willDeliver, setWillDeliver] = useState(false)

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await fetch('https://strangers-things.herokuapp.com/api/2104-UIC-RM-WEB-FT/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${grabToken()}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        }) 

        const data = await response.json();

        setPublicPosts([data.data.post, ...publicPosts])



    } 

    const cancelCreate = async() => {
        setAddPostClicked(false)
    }

    return (

        <>
        <div className = 'addform'>
            <form className = 'postadd' onSubmit={handleSubmit}>
                <h1 className = 'f1'>Add New Post</h1>
                <label className = 'f2'>Title</label>
                <input className = 'f2field' type ='text' id='title' 
                
                onChange={(event) => {setTitle(event.target.value)}}></input>

                <label className = 'f2'>Description</label>
                <input className = 'f2field' type='text' id='description' 
                
                onChange={(event) => {setDescription(event.target.value)}}></input>

                <label className = 'f2'>Price</label>
                <input className = 'f2field' type='text' id='price' 
                
                onChange={(event) => {setPrice(event.target.value)}}></input>

                <label className = 'f2'>Location</label>
                <input className = 'f2field' type='text' id='location' 
                
                onChange={(event) => {setLocation(event.target.value)}}></input>

                <div className = 'box'>
                <label className = 'f2'>Willing to Deliver?</label>
                <input className = 'f2field' className = 'check' type='checkbox'
                onChange={() => {setWillDeliver(true)}}></input>
                </div>

                <button className ='create'>Create</button>
            </form>
            <button className ='cancelCreate'
            onClick={cancelCreate}>Close</button>
        </div>
        </>

    )
}

export default AddPost