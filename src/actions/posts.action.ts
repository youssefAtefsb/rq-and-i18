import axios from "axios";
import type { DataItem, PostStatusType } from "../types";

interface FetchDataProps {
  selectedStatus: PostStatusType;
  paginate?: number;
}
export const fetchData = async  (
  selectedStatus: PostStatusType,
  paginate?: number
): Promise<DataItem[]> => {
  if (selectedStatus === "all") {
    const response = await axios.get<DataItem[]>(
      `http://localhost:4000/posts?_page=${paginate}&_limit=5`
    );
    return response.data;
  }else{
    const response = await axios.get<DataItem[]>(
      `http://localhost:4000/posts?status=${selectedStatus}`
    );
    return response.data;
  }
};

export const fetchPostQuery = async (q: string): Promise<DataItem[]> => {
  const response = await axios.get<DataItem[]>(
    `http://localhost:4000/posts?q=${q}`
  );
  return response.data;
};

export const fetchPostData = async (id: string): Promise<DataItem> => {
  const response = await axios.get<DataItem>(
    `http://localhost:4000/posts/${id}`
  );
  return response.data;
};
