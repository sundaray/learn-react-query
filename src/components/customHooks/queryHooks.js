import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchPosts = () => {
  const result = useQuery(["posts"], async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    return data;
  });

  return result;
};

export const useFetchPost = (searchQuery) => {
  const result = useQuery(["posts", searchQuery], async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${searchQuery}`
    );
    return data;
  });

  return result;
};
