import {  Row, Col } from "react-bootstrap";
import PostsTable from "../components/postsTable";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import type { PostStatusType } from "../types";
import SearchQuery from "../components/SearchQuery";
const Home = () => {
   const [selectedPostStatus, setSelectedPostStatus] =
    useState<PostStatusType>("all");
   const [searchQuery, setSearchQuery] = useState("");

  return (
    <Row>
      <Col xs={9}>
        <PostsTable searchQuery={searchQuery} selectedPostStatus={selectedPostStatus}/>
      </Col>
      <Col>
        <PostFilter selectedPostStatus={selectedPostStatus} setSelectedPostStatus={setSelectedPostStatus}/>
        <SearchQuery setSearchQuery={setSearchQuery}/>
      </Col>
    </Row>
  );
};

export default Home;