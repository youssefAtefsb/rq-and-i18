import {  useParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import useAddComment from "../hooks/useAddComment";
import useGetComments from "../hooks/useGetComments";

const Info = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>No post ID provided.</div>;
  }
  const {post, isError, isLoading} = useGetPost(id);
  const {comments} = useGetComments( id);

  const addComment = useAddComment()
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    addComment.mutate(
      { body: comment, post_id: Number(id) },
      {
      onSuccess: () => {
        setComment("");
      }
      }
    );
  }
  return (
    <div>
      <Row>
        <Col xs={6}>
          <h4>Title: {post?.title}</h4>
          <p>Status: {post?.status}</p>
          <p>Top Rate: {post?.topRate ? "true" : "false"}</p>
          <p>Body: {post?.body}</p>
          <hr />
          <h4 className="mb-1">Comments:</h4>
          <Form className="mb-3" onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={addComment.isPending}
            >
              Submit
            </Button>
          </Form>
         {comments?.map((comment, idx) => (
           <div key={idx}>
             <p>{comment.body}</p>
           </div>
         ))}
        </Col>
      </Row>
    </div>
  );
};

export default Info;