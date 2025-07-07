import  { useQuery } from "@tanstack/react-query"
import { getComments } from "../actions/comment.action"


const useGetComments = (
  post_id: string
) => {
    const { data, isError, isLoading} = useQuery({
    queryKey: ["comments", { post_id: +post_id }],
      queryFn: ()=> getComments(post_id),
    })
  return {
    comments:data,
    isError, 
    isLoading,
  }
}

export default useGetComments