import  { useQuery } from "@tanstack/react-query"
import type {  PostStatusType } from "../types"
import { fetchData } from "../actions/posts.action"


const useGetPosts = (
  selectedStatus: PostStatusType,
  paginate: number
) => {
    const { data, isError, isLoading, isStale, refetch} = useQuery({
      queryKey: ["posts", { selectedStatus, paginate }],
      queryFn: ()=> fetchData(selectedStatus, paginate),
      staleTime: 1000 * 60 *1,
      refetchInterval: 1000*60
    })
  return {
    posts:data,
    isError, 
    isLoading,
    isStale, 
    refetch
  }
}

export default useGetPosts