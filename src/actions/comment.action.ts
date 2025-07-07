import axios from "axios";
import type { CommentPost, CommentResponse } from "../types";


export const addComment = async (data: CommentPost): Promise<CommentResponse> => {
    const res = await axios.post<CommentResponse>("http://localhost:4000/comments", data);
    return res.data;
}

export const getComments = async (post_id: string): Promise<CommentResponse[]> => {
   const response = await axios.get<CommentResponse[]>(
      `http://localhost:4000/comments?post_id=${post_id}&_sort=id&_order=desc`
    );
    return response.data;
}