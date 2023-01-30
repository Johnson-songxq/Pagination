import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import Posts from "./components/Posts";
import axios from "axios";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [postsPerPage] = useState(10); //no need to set

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); //

  useEffect(() => {
    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPostsArr = posts.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(currentPostsArr);
  }, [currentPage, postsPerPage, posts]);
  //[]里面放上面里Props和state作为依靠的就可以了。

  //change page
  const updateActivePage = (number) => setCurrentPage(number);

  return (
    <div className="container">
      <h1 className="title">My Blog</h1>
      <Posts currentPosts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        // setCurrentPage = {setCurrentPage}
        //just to show how to get param from the children
        updateActivePage={updateActivePage}
      />
    </div>
  );
}
