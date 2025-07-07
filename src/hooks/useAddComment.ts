import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { CommentPost, CommentResponse } from "../types";
import { addComment } from "../actions/comment.action";

const useAddComment = (): UseMutationResult<
  CommentResponse,
  AxiosError,
  CommentPost
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addComment,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],exact: false
      });
    },
  });
};

export default useAddComment;
