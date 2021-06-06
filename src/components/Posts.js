import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import AddPost from './AddPost'
import Edits from './Edit'
import {grabToken} from '../api'


const Posts = (props) =>{
    const {publicPosts, setPublicPosts, loggedIn, setIsLoggedIn} = props;  //took out of props (isEditClicked, setIsEditClicked)
    const [postId, setPostsId] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [searchOutput, setSearchOutput] = useState ([])
    const [addPostClicked, setAddPostClicked] = useState(false)
    const [showResults, setShowResults] = useState(false)

    console.log('public posts:', publicPosts)

    const createPost = async () => {
        setAddPostClicked(true)
    }

    const makeEdit = async () => {
        setShowResults(true)
    }

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
                
                setSearchOutput(searchOutput => [...searchOutput, val])
            }
        }
            )
    }, [searchInput])


    return (
        <> 
        <div className = 'thesearcher'>
            <h2 className= 'searchposts'>Search Posts</h2>
            <div className ='search-bar'>
                <input className = 'searchfield' onChange = { event => setSearchInput(event.target.value) } type ='text' placeholder ='Search Title' />
            </div>
        
            <button className='addPost'
            onClick={createPost}>Add Post
            </button>
        </div>
            { addPostClicked ? 
            <AddPost publicPosts={publicPosts} setPublicPosts={setPublicPosts} addPostClicked={addPostClicked} setAddPostClicked={setAddPostClicked}/> 
            : null }
                       
            {
            searchInput ?
            <>
                {showResults ? <Edits publicPosts={publicPosts} setPublicPosts={setPublicPosts} postId = {postId} setPostsId = {setPostsId} 
                 showResults = {showResults} setShowResults = {setShowResults}/> : null}
            <div className ='userposts'> {searchOutput.map((post,index) => (
                    <div key = {index} className = 'post'>
                        <h1 className = 'q1t'>{post.title}</h1> 
                    <p className = 'q1'>{post.description}</p>
                    <h3 className = 'q1'>Price: {post.price}</h3>
                    <h3 className = 'q1' id = 'seller'>Seller: {post.author.username}</h3>
                    <h3 className = 'q1'>Location: {post.location}</h3>            

                    <button type='button' className = 'edit' onClick = {() => {setPostsId(post._id); makeEdit()}}>Edit</button>
                    
                    <button type='button' className = 'delete' onClick = {() => handleDelete(post._id)}>Delete</button>
                
                    <Edits publicPosts={publicPosts} setPublicPosts={setPublicPosts} postId = {postId} setPostsId = {setPostsId} 
                   />

                    </div>))}

                </div>
                </>
                
                :

                <>
                {showResults ? <Edits publicPosts={publicPosts} setPublicPosts={setPublicPosts} postId = {postId} setPostsId = {setPostsId} 
                 showResults = {showResults} setShowResults = {setShowResults}/> : null}
            <div className = 'userposts'> {publicPosts.map((post, index) => (

                <div key={index} className='post' >  
                    <h1 className = 'q1t'>{post.title}</h1> 
                    <p className = 'q1'>{post.description}</p>
                    <h3 className = 'q1'>Price: {post.price}</h3>

                    <h3 className = 'q1' id = 'seller'>Seller: {post.author.username}</h3> 
                    <h3 className = 'q1'>Location: {post.location}</h3>            

                    <button type='button' className = 'edit' onClick = {() => {setPostsId(post._id); makeEdit() }}> 
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