import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";


const PostPage = () => {
  const {posts,handleDelete} = useContext(DataContext);
  const {id} = useParams();
  const post = posts.find((post)=>(post.id).toString() === id);
  return (
    <main className="postPage">
      <article className="post">
        {post && 
        <>
         <h1 className="postTitle">{post.title}</h1>
        <p className="postDate">{post.datetime}</p>
        <p className="postBody">{post.body}</p>
        <Link to = {`/edit/${post.id}`}>
          <button className="editButton">Edit</button>
        </Link>
        <button className="deleteButton" onClick={()=>handleDelete(post.id)}>Delete</button>
        </>
        }

        {!post &&
        <>
        <h2>Page Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>Visit Our Homepage</p>
        </>
        }

      </article>
    </main>
  );
};

export default PostPage;
