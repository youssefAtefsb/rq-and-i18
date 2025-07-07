import type { DataItem, PostStatusType } from "../types";
import useGetPosts from "../hooks/useGetPosts";
import { Link } from "react-router-dom";
import { Form, ButtonGroup, Button, Table } from "react-bootstrap";
import useSearch from "../hooks/useSearch";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../actions/posts.action";

interface PostListProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
}

const PostsTable = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const [paginate, setPaginate] = useState(1);

  const queryClient = useQueryClient();

  // ✅ useEffect must come before any return
  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage > 3) return;

    queryClient.prefetchQuery({
      queryKey: ["posts", "all", nextPage],
      queryFn: () => fetchData("all", nextPage),
    });
  }, [paginate, queryClient]);

  const {
    posts = [],
    isError,
    isLoading,
    refetch,
    isStale,
  } = useGetPosts(selectedPostStatus, paginate);

  const {
    searchPosts,
    searchIsError,
    searchIsLoading,
  } = useSearch(searchQuery);

  // ✅ All hooks above this line

  // ✅ now you can safely return
  if (isLoading || searchIsLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || searchIsError) {
    return <h1>Error fetching posts</h1>;
  }

  return (
    <>
      {isStale && searchQuery.length === 0 && (
        <Button className="mb-3" onClick={() => refetch()}>
          Refetch
        </Button>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th style={{ width: "10%" }}>Top Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchQuery.length === 0 &&
            posts.length > 0 &&
            posts.map((post: DataItem, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/info/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check type="switch" />
                </td>
                <td>
                  <ButtonGroup>
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}

          {searchQuery.length > 0 &&
            searchPosts?.map((post: DataItem, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/info/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check type="switch" />
                </td>
                <td>
                  <ButtonGroup>
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {selectedPostStatus === "all" && searchQuery.length === 0 && (
        <div className="d-flex justify-content-center">
          <ButtonGroup>
            <Button
              variant="secondary"
              onClick={() => setPaginate(paginate - 1)}
              disabled={paginate === 1}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={() => setPaginate(paginate + 1)}
            >
              Next
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default PostsTable;
