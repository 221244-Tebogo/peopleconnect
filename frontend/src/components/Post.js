import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/announcements",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `http://localhost:5001/api/announcements/like/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Post liked!");
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await axios.post(
        `http://localhost:5001/api/announcements/dislike/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Post disliked!");
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  return (
    <div>
      <h1>Announcements</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>Created by: {post.createdBy?.name}</small>
          <div>
            <button onClick={() => handleLike(post._id)}>Like</button>
            <button onClick={() => handleDislike(post._id)}>Dislike</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
