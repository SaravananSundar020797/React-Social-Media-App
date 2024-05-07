import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DataContext from './context/DataContext';

const EditPost = () => {
  const {posts,editPostTitle,setEditPostTitle,editPostBody,setEditPostBody,handleEditPost} = useContext(DataContext);
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  useEffect(()=>{
    if(post){
      setEditPostTitle(post.title);
      setEditPostBody(post.body);
    }
  },[post,setEditPostTitle,setEditPostBody])
  return (
    <main className='editPost'>
      {editPostTitle && 
        <>
          <h2>Edit Post</h2>
            <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="postTitle">Edit Title : </label>
              <input type="text" id="postTitle" value={editPostTitle} onChange={(e) => setEditPostTitle(e.target.value)} required />
              <label htmlFor="postBody">Edit Post : </label>
              <textarea type="text" id="postBody" value={editPostBody} onChange={(e) => setEditPostBody(e.target.value)} required />
              <button type='submit' onClick={() => handleEditPost(post.id)}>Submit</button>
            </form>
        </>
      }
      {!editPostTitle &&
        <>
           
              <h2>Page Not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>Visit Our Homepage</p>
               
        </>

      }

    </main>
  )
}

export default EditPost