import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { DataItem } from "../types";

const fetchData = async (q: string): Promise<DataItem[]> => {
  const response = await axios.get<DataItem[]>(
    `http://localhost:4000/posts?q=${q}`
  );
  return response.data;
};

const useSearch = (q: string) => {
  const {
    data,
    isError,
    isLoading
  } = useQuery({
    queryKey: ["posts", "search", q],
    queryFn: () => fetchData(q),
    staleTime: 1000 * 60 * 5,
    enabled: q.trim().length > 0, 
  });

  return {
    searchPosts: data,
    searchIsError: isError,
    searchIsLoading: isLoading,
  };
};

export default useSearch;
