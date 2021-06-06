import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import AddPost from './AddPost'
import Edits from './Edit'
import {grabToken} from '../api'


const Posts = (props) =>{
    const {publicPosts, setPublicPosts, loggedIn, setIsLoggedIn} = props;  //took out of props (isEditClicked, setIsEditClicked)
    const [postId, setPostsId] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [searchOutput, setSearchOutput] = useState ([])
    const [addPostClicked, setAddPostClicked] = useState(false)
    const [isEditClicked, setIsEditClicked] = useState(false)
    //const [showResults, setShowResults] = useState(false)

    const createPost = async () => {
        setAddPostClicked(true)
    }

    //const [showResults, setShowResults] = useState(false) 

    const handleDelete = async (postIdToDelete) => {
        console.log('postIdToDelete: ', postIdToDelete)
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2104-UIC-RM-WEB-FT/posts/${postIdToDelete}`,       
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${grabToken()}` 
            }
        })

        const data = response.json()
        console.log('data', data)

        if(data){
            const newPost = publicPosts.filter(post => post._id !== postIdToDelete)
            setPublicPosts(newPost)
        }
    }

    useEffect(() => {
        setSearchOutput([])
        publicPosts.filter(val =>{
            if(val.title.toLowerCase().includes(searchInput.toLowerCase())){
                
                //setSearchOutput(searchOutput => [val])
                setSearchOutput([val])
            }
        }
            )
    }, [searchInput])


    // const handleClick = ( ) => {

    //     <Edits publicPosts={publicPosts} setPublicPosts={setPublicPosts} postId = {postId} setPostsId = {setPostsId} />
    // }

    return (
        <> 
            <h1>Search Posts</h1>
            <div className ='search-bar'>
                <input onChange = { event => setSearchInput(event.target.value) } type ='text' placeholder ='Search' />
            </div>

            <button className='addPost'
            onClick={createPost}>Add Post
            </button>

            { addPostClicked ? 
            <AddPost publicPosts={publicPosts} setPublicPosts={setPublicPosts} addPostClicked={addPostClicked} setAddPostClicked={setAddPostClicked}/> 
            : null }
                       
            {
            searchInput ?
            <>
            <div className ='output'> {searchOutput.map((post,index) => (
                    <div key = {index} className = 'outsearch'>
                    <h1>{post.title}</h1> 
                    <p>{post.description}</p>
                    <h3>Price: {post.price}</h3>
                    {/* <h2>Seller: {post.author.username}</h2> */}
                    <h3>Location: {post.location}</h3>            
                    {/* <Link to = {`/editpost/${post._id}`} >Edit</Link> */}

                    <button type='button' className = 'edit' onClick = {() => setPostsId(post._id), setIsEditClicked(true)}>Edit</button>   
                    <button type='button' className = 'delete' onClick = {() => handleDelete(post._id)}>Delete</button>

                    </div>))}

                </div>
                </>
                
                :

                <>  
                <div className = 'userposts'> {publicPosts.map((post, index) => (               
                    <div key={index} className='post' > 
                        <h1>{post.title}</h1> 
                        <p>{post.description}</p>
                        <h3>Price: {post.price}</h3>
                        {/*  seller: causes error but still actually posts after refresh????? */}
                        <h2>Seller: {post.author.username}</h2> 
                        <h3>Location: {post.location}</h3>            

                        <button type='button' className = 'edit' onClick = {() => {setPostsId(post._id), setIsEditClicked(true), console.log('id', postId) }}>   {/*set inactive to active*/}
                            Edit button
                        </button>

                        <button type='button' className = 'delete' onClick = {() => handleDelete(post._id)}>Delete</button>      

                        {
                        isEditClicked ? 
                        <Edits publicPosts={publicPosts} setPublicPosts={setPublicPosts} postId={postId} setPostsId={setPostsId} isEditClicked={isEditClicked} setIsEditClicked={setIsEditClicked}/> 
                        : null
                        } 

                    </div>))}           
                </div>

                </>
            }
        </>
    )
}

export default Posts;