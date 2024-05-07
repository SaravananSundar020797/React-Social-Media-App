import React, { useContext } from "react";
import DataContext from "./context/DataContext";

const NewPost = () => {
  const {handleSubmit,postTitle,setPostTitle,postBody,setPostBody} = useContext(DataContext);
  return (
    <main className="newPost">
      <h2>New Post</h2>
      <form action="" className="newPostForm" onSubmit={handleSubmit}>
        <div className="postTitle">
          <label htmlFor="postTitle">Title : </label>
          <input
            type="text"
            name="title"
            required
            id="postTitle"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div className="postBody">
          <label htmlFor="postBody">Post :</label>
          <textarea
            name=""
            id="postBody"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};
export default NewPost;
