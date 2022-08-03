import React, { useState } from "react";
import { useFetchPosts } from "./customHooks/queryHooks";
import { useFetchPost } from "./customHooks/queryHooks";

const Posts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState(null);
  const [singlePost, setSinglePost] = useState(null);

  const { data, error, isError, isLoading } = useFetchPosts();
  const {
    data: postData,
    error: postError,
    isError: postIsError,
    isLoading: postIsLoading,
  } = useFetchPost(searchQuery);

  const handlePostList = () => {
    setPosts(data);
  };

  const handlePostItem = () => {
    setSinglePost(postData);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          disabled={searchQuery === ""}
          onClick={handlePostItem}
        >
          Search
        </button>
        <button
          type="submit"
          disabled={searchQuery !== ""}
          onClick={handlePostList}
        >
          All Users
        </button>
      </div>
      <div className="user-list">
        <ul>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>{error.message}</p>
          ) : (
            posts &&
            searchQuery === "" &&
            posts.map((post) => <li key={post.id}>{post.title}</li>)
          )}
        </ul>
        <ul>
          {postIsLoading ? (
            <p>Loading...</p>
          ) : postIsError ? (
            <p>{postError.message}</p>
          ) : (
            <li>{singlePost && searchQuery !== "" && singlePost.title}</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Posts;
