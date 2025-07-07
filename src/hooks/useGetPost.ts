import  { useQuery } from "@tanstack/react-query"
import { fetchPostData } from "../actions/posts.action"

const useGetPost = (id: string) => {
    const { data, isError, isLoading} = useQuery({
      queryKey: ["posts"],
      queryFn: () => fetchPostData(id)
    })
  return {
    post:data,
    isError, 
    isLoading
  }
}

export default useGetPost