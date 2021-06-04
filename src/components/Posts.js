import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import AddPost from './AddPost'
import Edits from './Edit'
import {grabToken} from '../api'


const Posts = (props) =>{
    const {publicPosts, setPublicPosts, loggedIn, setIsLoggedIn, isEditClicked, setIsEditClicked} = props;
    const [postId, setPostsId] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [searchOutput, setSearchOutput] = useState ([])
<<<<<<< HEAD
    const [addPostClicked, setAddPostClicked] = useState(false)

    const createPost = async () => {
        setAddPostClicked(true)
    }
=======
    const [showResults, setShowResults] = useState(false)
>>>>>>> a55111092384721853f073b4e16fb2ff6f8531df

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
                
                setSearchOutput(searchOutput => [val])
                // setSearchOutput(searchOutput => [...searchOutput, val])
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

                    <button type='button' className = 'edit' onClick = {() => setPostsId(post._id)}>Edit</button>
                    
                    <button type='button' className = 'delete' onClick = {() => handleDelete(post._id)}>Delete</button>
                
                    <Edits publicPosts={publicPosts} setPublicPosts={setPublicPosts} postId = {postId} setPostsId = {setPostsId} />

                    </div>))}

                </div>
                </>
                
                :

                <>
                {showResults ? <Edits publicPosts={publicPosts} setPublicPosts={setPublicPosts} postId = {postId} setPostsId = {setPostsId} /> : null}
            <div className = 'userposts'> {publicPosts.map((post, index) => (
                
                <div key={index} className='post' > 
                    <h1>{post.title}</h1> 
                    <p>{post.description}</p>
                    <h3>Price: {post.price}</h3>
                    {/* causes error but still actually posts after refresh????? */}
                    <h2>Seller: {post.author.username}</h2> 
                    <h3>Location: {post.location}</h3>            
                    {/* <Link to = {`/editpost/${post._id}`} >Edit</Link> */}


                    <button type='button' className = 'edit' onClick = {() => {setPostsId(post._id); setShowResults(true) }}> 
                        Edit 
                    </button>
                    
                    <button type='button' className = 'delete' onClick = {() => handleDelete(post._id)}>Delete</button>
                    
                    
                
                 </div>))}           
          
            </div>
            </>
            }
        </>
    )
}

export default Posts;