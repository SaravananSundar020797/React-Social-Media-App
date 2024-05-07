import { useState, useEffect, createContext } from "react";
import { format } from "date-fns";
import {useNavigate } from "react-router-dom";
import api from "../api/posts.js";
import useWindowSize from "../hook/useWindowSize.js";
import useAxiosFetch from "../hook/useAxiosFetch.js";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const[posts,setPosts] = useState([]);
  const [search,setSearch] = useState("");
  const [searchResults,setSearchResults] = useState([]);
  const [postTitle,setPostTitle] = useState("");
  const [postBody,setPostBody] = useState("");
  const [editPostTitle,setEditPostTitle] = useState("");
  const [editPostBody,setEditPostBody] = useState("");
  const navigator = useNavigate();
  const {width} = useWindowSize();
  const {data,fetchError,isLoading} = useAxiosFetch('http://localhost:3500/posts')

  useEffect(()=>{
    setPosts(data);
  },[data]);


  // useEffect(()=>{
  //   const fetchPosts = async () => {
  //     try{
  //       const response = await api.get('/posts');
  //       setPosts(response.data)
  //     }catch(err){
  //       if(err.response){
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       }else{
  //         console.log(`Error : ${err.message}`);
  //       }
  //     }
  //   }
  //   fetchPosts();
  // }, [])
  

  useEffect(() => {
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase())) || posts.filter((post) => ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  }, [posts,search]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(),'MMMM dd, yyyy pp');
    console.log( "Date Time : ",datetime)
    const newPost = {id,title:postTitle,datetime,body:postBody};
    try{
      const response = await api.post('/posts',newPost);
    const allPosts = [...posts,response.data];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigator('/');
    }catch(err){
      console.log(`Error : ${err.message}`);
    }
  };

  const handleDelete = async(id) =>{
    try{
      await api.delete(`posts/${id}`); 
    const postList = posts.filter((post) => post.id !== id);
    setPosts(postList);
    navigator('/');
    }catch(err){
      console.log(`Error : ${err.message}`);
    }
  };

  const handleEditPost = async(id) => {
    const datetime = format(new Date(),'MMMM dd, yyyy pp');
    const updatePost = {id,title:editPostTitle,datetime,body:editPostBody};
    try{
      const response = await api.put(`/posts/${id}`,updatePost);
      setPosts(posts.map((post) => (post.id) === id ? {... response.data} : post));
      setEditPostTitle('');
      setEditPostBody('');
      navigator('/');
    }catch(err){
      console.log(`Error : ${err.message}`);
    }
  }
  return(
    <DataContext.Provider value={{
      width,search,setSearch,searchResults,fetchError,isLoading,handleSubmit,postTitle,setPostTitle,postBody,setPostBody,posts,editPostTitle,setEditPostTitle,editPostBody,setEditPostBody,handleEditPost,handleDelete
      }}>
      {children}
      </DataContext.Provider>
  ) ;
};

export default DataContext;
